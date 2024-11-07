import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

const JobSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    clerkId: {
      type: String,
      required: true,
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

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
export default Job;