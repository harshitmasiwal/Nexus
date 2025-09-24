created the updateproblem , deleteproblem route for admin 
and getproblembyid and getallproblem for everyone

also learned about the pagination which calcultes what skip and limit
it looks like await problem.find().skip(int).limit(int) 
skip will be calculated from the page no and limit => skip = page-1 * limit
for page one skip will be 0 
for page two skip will be 10 
for page three skip will be 20
and limit tells what to showw 




Hello! To add pagination to your API endpoint, you'll need to modify your getAllProblems function to accept page and limit parameters from the query string. Here's how you can implement it:

javascript
const getAllProblems = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to page=1 and limit=10 if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Get total number of documents for pagination info
    const totalProblems = await Problem.countDocuments();
    
    // Get paginated results
    const problems = await Problem.find({})
      .skip(skip)
      .limit(limit);

    if (problems.length === 0) {
      return res.status(200).send("No problems in the DB");
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalProblems / limit);

    // Return response with pagination metadata
    res.status(200).json({
      problems,
      pagination: {
        currentPage: page,
        totalPages,
        totalProblems,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        limit
      }
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
Now your API will work with URLs like:

localhost:4000/problem/all?page=1&limit=10

localhost:4000/problem/all?page=2&limit=5

localhost:4000/problem/all (will use defaults: page=1, limit=10)


example use case
