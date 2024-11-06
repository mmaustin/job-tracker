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

    const jobWithStringId: JobTypeWithStringId = { clerkId: job.clerkId, position: job.position, company: job.company, location: job.location, status: job.status, mode: job.mode, _id: job._id.toString(), createdAt: job.createdAt, updatedAt: job.updatedAt };

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

// export async function testMongoDB(): Promise<null> {
//   const userId = authenticateClerkId();
//   let queryObj: AddValues = { clerkId: userId };

//   try {

//     await connectToDB();

//     if (4 + 2 === 6) queryObj = { ...queryObj, location: "new york" };

//     const job = await Job.aggregate([])//find(queryObj).or([{ company: "cleary" }, { position: "chef" }])

//     console.log(job);

//     return null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   };
// };

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

type QueryObjectValues = {
  clerkId: string,
  status?: string,
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobTypeWithStringId[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateClerkId();
  let queryObj: QueryObjectValues = { clerkId: userId };
  let jobs: JobTypeWithStringId[];

  try {
    await connectToDB();
    if (jobStatus && jobStatus !== 'all') {
      queryObj = { ...queryObj, status: jobStatus };
    };

    //let jobsToStringId: JobType[];

    if (search) {
      jobs = await Job.find(queryObj).or([{ company: search }, { position: search }]).sort({ createdAt: 'desc' });
    } else {
      jobs = await Job.find(queryObj).sort({ createdAt: 'desc' })
    };

    jobs = jobs.map(job => {
      let newId = job._id.toString();
      return {_id: newId, company: job.company, clerkId: job.clerkId, position: job.position, location: job.location, status: job.status, mode: job.mode, createdAt: job.createdAt, updatedAt: job.updatedAt  } = job;
    })

    //console.log(jobs);


    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

