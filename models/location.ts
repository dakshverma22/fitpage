import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: false,
  },
  longitude: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  }
});

export const Location = mongoose.model("Location", locationSchema);
