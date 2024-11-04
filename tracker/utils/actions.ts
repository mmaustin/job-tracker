/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
// import dayjs from 'dayjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema, JobTypeWithStringId } from './types';
import JobsPage from "@/app/(dashboard)/jobs/page";

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
      ...values, clerkId: userId
    });
  
    const jobWithStringId: JobTypeWithStringId = {clerkId: job.clerkId, position: job.position, company: job.company, location: job.location, status: job.status, mode: job.mode, _id: job._id.toString(), createdAt: job.createdAt, updatedAt: job.updatedAt};

    return jobWithStringId;
  } catch (error) {
    console.log(error);
    return null;
  };
};

type AddValues = {
  clerkId: string,
  location?: string,
}

export async function testMongoDB(): Promise<null> {
  const userId = authenticateClerkId();
  let queryObj: AddValues = {clerkId: userId};

  try {

    await connectToDB();
    //const obj = {location: "new york", status: "pending"}
    //const job = await Job.find().countDocuments()//({obj, position: "lawyer"}).or([{company: "leary"}, {clerkId: 'user_2nRdwhhdlc0o0gYx5Qhvjh8TGSb'}])

    if(4 + 2 === 6) queryObj = {...queryObj, location: "new york"};

    const job = await  Job.find(queryObj).or([{company: "cleary"}, {position: "chef"}])
  
    console.log(job);
    
    return null;
  } catch (error) {
    console.log(error);
    return null;
  };
};

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

type Values = {
  clerkId: string,
  status?: string,
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateClerkId();
  let queryObj: Values = {clerkId: userId};
  let jobs: JobType[];

  try {

    if (jobStatus && jobStatus !== 'all') {
      queryObj = {...queryObj, status: jobStatus};
    };

    if(search){
      jobs = await Job.find(queryObj).or([{company: search}, {position: search}]).sort({createdAt: 'desc'});
    } else {
      jobs = await Job.find(queryObj).sort({createdAt:'desc'})
    };

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

