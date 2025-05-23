/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import Job from "@/models/Job";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
import dayjs from 'dayjs';
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
    return null;
  };
};


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

    const skipOver = (page - 1) * limit;

    if (search) {
      jobs = await Job.find(queryObj).or([{ company: search }, { position: search }]).skip(skipOver).limit(limit).sort({ createdAt: 'desc' });
    } else {
      jobs = await Job.find(queryObj).skip(skipOver).limit(limit).sort({ createdAt: 'desc' });
    };

    jobs = jobs.map(job => {
      return JSON.stringify(job);
    });

    const count: number = await Job.find(queryObj).countDocuments();

    const totalPages = Math.ceil(count/limit);

    return { jobs, count, page, totalPages };
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

export async function getSingleJobAction(id: string): Promise<string | null> {
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
  return JSON.stringify(job);
};

export async function updateJobAction(id: string, values: CreateAndEditJobType): Promise<string | null> {
  const userId = authenticateClerkId();

  try {
    await connectToDB();

    const job: JobType | null = await Job.findOneAndUpdate({ _id: id, clerkId: userId }, { $set: { ...values } }, { new: true });

    const jobStringified: string = JSON.stringify(job);

    return jobStringified;
  } catch (error) {
    return null
  }
};

export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  const userId = authenticateClerkId();


  try {
    await connectToDB();

    const stats: { _id: string, count: number }[] = await Job.aggregate(
      [
        { $match: { clerkId: userId } },
        { $group: { _id: "$status", count: { $count: {} } } }
      ]
    );

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    };

    return defaultStats;

  } catch (error) {
    redirect('/jobs');
  }
};

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authenticateClerkId();
  const threeMonthsAgo = dayjs().subtract(3, 'month').toDate();
  
  try {
    await connectToDB();

    const jobs: JobType[] = await Job.find({ createdAt: { $gte: threeMonthsAgo }, clerkId: userId }).sort({ createdAt: 'desc' })

    const monthlyApplications = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return monthlyApplications;
  } catch (error) {
    redirect('/jobs');
  }
}
