const mongoose = require('mongoose');
const { Schema } = mongoose;

const editorialSchema = new Schema(
  {
    // Reference to the related problem
    problem: {
      type: Schema.Types.ObjectId,
      ref: 'problem',
      required: true,
    },

    // Optional heading or title of the editorial
    title: {
      type: String,
      required: true,
    },

    // Markdown or HTML content explaining the problem’s solution
    explanation: {
      type: String,
      required: true,
    },

    // Optional sub-sections for stepwise explanation
    sections: [
      {
        heading: String,
        content: String,
        codeSnippet: String, // Optional small code block inside section
      },
    ],

    // Associated video tutorial (Cloudinary or YouTube)
    videoUrl: {
      type: String,
    },

    // Cloudinary public ID for video management (delete/edit later)
    videoPublicId: {
      type: String,
    },

    // Duration of the video in seconds
    videoLength: {
      type: Number,
    },

    // Thumbnail or preview image for the editorial video
    thumbnailUrl: {
      type: String,
    },

    // Author of the editorial (linked to user)
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    // Optional languages or approaches discussed in the editorial
    approaches: [
      {
        language: {
          type: String,
          enum: ['C++', 'Java', 'Javascript', 'Python'],
        },
        code: String,
        explanation: String,
      },
    ],

    // Engagement / analytics data
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Editorial = mongoose.model('editorial', editorialSchema);

module.exports = Editorial;
