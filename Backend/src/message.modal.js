import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userName",
    required: true,
  },
  users:Array,
  content: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model("Message", MessageSchema);
