import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  dateJoined: { type: Date, default: Date.now },

});

export default mongoose.model("User", userSchema);
