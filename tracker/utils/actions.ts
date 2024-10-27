/* eslint-disable @typescript-eslint/no-unused-vars */
import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
import dayjs from 'dayjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';



export async function createJobAction(): Promise<JobType | null>{
  const {userId} = auth();

  try {
    await connectToDB();
    const job: JobType = await Job.create({
      position: "welder", location: "detroit", company: "ford", status: "interview", mode: "internship", clerkId: userId
      // ...values, clerkId:userId
    });
    console.log(job);
    
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

