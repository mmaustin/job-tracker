import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

const DemoJobSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DemoJob = mongoose.models.DemoJob || mongoose.model("DemoJob", DemoJobSchema);
export default DemoJob;