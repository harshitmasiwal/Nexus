const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      uppercase: true,
      required: true,
      trim: true,
      uppercase: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 20,
      uppercase: true,
      trim: true,
      uppercase: true,
    },
    emailID: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    problemSolved: [
      {
        type: Schema.Types.ObjectId,
        ref: "problem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.path("problemSolved").validate(function (value) {
  return (
    Array.isArray(value) && new Set(value.map(String)).size === value.length
  );
}, "Duplicate problem IDs are not allowed in problemSolved array");

userSchema.post("findOneAndDelete", async function (user) {
  if (user) {
    await mongoose.model("submission").deleteMany({ userId: user._id });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
