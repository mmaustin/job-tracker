/* eslint-disable @typescript-eslint/no-unused-vars */
import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
import dayjs from 'dayjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';



export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null>{
  const {userId} = auth();

  try {
    const job: JobType = await Job.create({
      ...values, clerkId:userId
    });
    return job
  } catch (error) {
    console.log(error);
    return null;
  }
}

