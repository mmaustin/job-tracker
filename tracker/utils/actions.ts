/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
// import dayjs from 'dayjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema, DeletedQueryType } from './types';


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
      ...values, clerkId: userId,
    });

    const jobStringified: string = JSON.stringify(job);

    return jobStringified;
  } catch (error) {
    console.log(error);
    return null;
  };
};

// type AddValues = {
//   clerkId: string,
//   location?: string,
// }

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
  jobs: string[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateClerkId();
  let queryObj: QueryObjectValues = { clerkId: userId };
  let jobs: JobType[] | string[];

  try {
    await connectToDB();
    if (jobStatus && jobStatus !== 'all') {
      queryObj = { ...queryObj, status: jobStatus };
    };


    if (search) {
      jobs = await Job.find(queryObj).or([{ company: search }, { position: search }]).sort({ createdAt: 'desc' });
    } else {
      jobs = await Job.find(queryObj).sort({ createdAt: 'desc' })
    };

    jobs = jobs.map(job => {
      return JSON.stringify(job);
    })

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

export async function deleteJobAction(id: string): Promise<DeletedQueryType | null> {

  const userId = authenticateClerkId();

  try {
    connectToDB();
    const deletedQueryObject: DeletedQueryType = await Job.deleteOne({ _id: id, clerkId: userId });

    return deletedQueryObject;
  } catch (error) {
    return null;
  }
};

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateClerkId();
  let job: JobType | null;

  try {
    await connectToDB();

    job = await Job.findOne({ _id: id, clerkId: userId });

  } catch (error) {
    job = null;
  };

  if (!job) {
    redirect('/jobs');
  };
  return job;
};

export async function updateJobAction(id: string, values: CreateAndEditJobType): Promise<string | null> {
  const userId = authenticateClerkId();

  try {
    await connectToDB();

    // const destructuredValues: string[] = Object.values(values);
    // const [position, company, location, status, mode] = [...destructuredValues];

    const job: JobType | null = await Job.findOneAndUpdate({ _id: id, clerkId: userId }, { $set: { ...values } }, { new: true });

    const jobStringified: string = JSON.stringify(job);
    console.log(jobStringified);

    return jobStringified;
  } catch (error) {
    return null
  }
}

// const destructuredValues: string[] = Object.values(values);
// const [position, company, location, status, mode] = [...destructuredValues];

// { values }: { values: { position: string, company: string, location: string, status: string, mode: string } }