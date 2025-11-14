const crypto = require("crypto");
const Editorial = require('../model/editorial')
const Problem = require('../model/problem')

const signature = (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Only sign parameters that are being sent to Cloudinary
    const stringToSign = `timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign)
      .digest("hex");

    res.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (err) {
    res.status(400).send("error : " + err.message);
  }
};


const saveVideoToBackend = async (req, res) => {
  try {
    // Destructure all required fields, including video details
    const { 
      problem,
      title,
      explanation,
      author, // This is the userId from the frontend, mapped to 'uploadedBy' in the previous version
      videoUrl,
      videoPublicId,
      videoLength,
      // thumbnailUrl, // Add if you are sending this
    } = req.body;

    // Validate essential fields for an Editorial
    if (!problem || !title || !explanation || !author || !videoUrl) {
      return res.status(400).json({ 
        message: "Missing required fields for Editorial (problem, title, explanation, author, videoUrl)",
        received: req.body // Helps in debugging
      });
    }

    // Create a new Editorial document with all fields
    const editorial = new Editorial({
      problem: problem, // MongoDB ID of the problem
      title: title,
      explanation: explanation,
      author: author, // MongoDB ID of the user
      videoUrl: videoUrl,
      videoPublicId: videoPublicId,
      videoLength: videoLength, // Duration in seconds
      // thumbnailUrl: thumbnailUrl,
      // You can add logic for 'sections' and 'approaches' here if they are part of the form
    });

    await editorial.save();
    const updatedProblem = await Problem.findByIdAndUpdate(
      problem, // Use the problem ID sent from the frontend
      // ✅ CORRECTED: Use the 'editorial' field defined in your Problem Schema
      { $set: { editorial: editorial._id } }, 
      { new: true, runValidators: true } 
    );
    
    // Check if the Problem was found and updated
    if (!updatedProblem) {
         // Cleanup: Delete the newly saved editorial to prevent orphaned data
         await Editorial.findByIdAndDelete(editorial._id);
         return res.status(404).json({ 
            message: "Problem not found with the provided ID. Editorial creation aborted.",
            editorialId: editorial._id // For debugging
         });
    }

    res.status(201).json({
      message: "Editorial with video saved successfully ✅",
      editorial,
    });

  } catch (err) {
    console.error("Error saving Editorial:", err);
    // Use a more specific status code for validation/Mongoose errors
    if (err.name === 'ValidationError' || err.code === 11000) { 
        return res.status(400).json({ message: "Validation error saving editorial", error: err.message });
    }
    res.status(500).json({ message: "Internal server error saving editorial", error: err.message });
  }
};


const getEditorialByProblemId = async (req, res) => {
    try {
        // console.log(req.params)
        const  {editorialID}  = req.params; // Expect problemId from URL params
        // console.log(editorialID)
        // console.log(problemId)
        if (!editorialID) {
            return res.status(400).json({ message: "editorial ID is required." });
        }

        const editorial = await Editorial.findOne({ _id : editorialID });
        
        if (!editorial) {
            return res.status(404).json({ message: "Editorial not found for this problem." });
        }

        // Return the full editorial document
        res.status(200).json({ editorial });

    } catch (err) {
        console.error("Error fetching editorial:", err);
        res.status(500).json({ message: "Internal server error fetching editorial", error: err.message });
    }
};

module.exports = {
  signature,
  saveVideoToBackend,
  getEditorialByProblemId
};
