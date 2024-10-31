'use server'

import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
// import dayjs from 'dayjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema, JobTypeWithStringId } from './types';

function authenticateClerkId(): string {
  const { userId } = auth();
  if (!userId) redirect('/');
  return userId;
};

export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null | JobTypeWithStringId> {
  const userId = authenticateClerkId();

  try {

    createAndEditJobSchema.parse(values);

    await connectToDB();
    const job: JobType = await Job.create({
      // position: "welder", location: "detroit", company: "ford", status: "interview", mode: "internship", clerkId: userId
      ...values, clerkId: userId
    });
    // const newJobId = job._id.toString();
    // job._id = newJobId;
    //job._id = job._id.toString();
    //console.log(job._id);
    const jobWithStringId: JobTypeWithStringId = {clerkId: job.clerkId, position: job.position, company: job.company, location: job.location, status: job.status, mode: job.mode, _id: job._id.toString(), createdAt: job.createdAt, updatedAt: job.updatedAt};

    return jobWithStringId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

