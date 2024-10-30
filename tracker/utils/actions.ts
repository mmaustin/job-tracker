'use server'

import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
// import dayjs from 'dayjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';

function authenticateClerkId(): string {
  const { userId } = auth();
  if (!userId) redirect('/');
  return userId;
};

export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null | string> {
  const userId = authenticateClerkId();

  try {

    createAndEditJobSchema.parse(values);

    await connectToDB();
    const job: JobType = await Job.create({
      // position: "welder", location: "detroit", company: "ford", status: "interview", mode: "internship", clerkId: userId
      ...values, clerkId: userId
    });
    console.log(job);
    // const newJobId = job._id.toString();
    // job._id = newJobId;

    return job.company;
  } catch (error) {
    console.log(error);
    return null;
  }
}

