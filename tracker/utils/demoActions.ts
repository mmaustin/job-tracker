/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import DemoJob from "@/models/DemoJobs";
import { connectToDB } from "./db";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { DemoJobType, CreateAndEditJobType, createAndEditJobSchema, DeletedQueryType } from './demoTypes';

export async function createDemoJobAction(values: CreateAndEditJobType): Promise<DemoJobType | null | string> {

  try {

    createAndEditJobSchema.parse(values);

    await connectToDB();
    const job: DemoJobType = await DemoJob.create({
      ...values
    });

    const jobStringified: string = JSON.stringify(job);

    return jobStringified;
  } catch (error) {
    return null;
  };
};

type DemoGetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

type DemoQueryObjectValues = {
  status?: string,
};

export async function demoGetAllJobsAction({
  search, jobStatus, page = 1, limit = 10
}: DemoGetAllJobsActionTypes): Promise<
  {
    jobs: string[];
    count: number;
    page: number;
    totalPages: number;
  }
> {

  let queryObj: DemoQueryObjectValues = {};

  let jobs: DemoJobType[] | string[];

  try {
    await connectToDB();

    if (jobStatus && jobStatus !== 'all') {
      queryObj = { ...queryObj, status: jobStatus };
    };

    const skipOver = (page - 1) * limit;

    jobs = await DemoJob.find(queryObj).skip(skipOver).limit(limit).sort({ createdAt: 'desc' });

    jobs = jobs.map(job => {
      return JSON.stringify(job);
    });

    const count: number = await DemoJob.find(queryObj).countDocuments();

    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };

  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

export async function demoDeleteJobAction(id: string): Promise<DeletedQueryType | null> {

  try {
    connectToDB();
    const deletedQueryObject: DeletedQueryType = await DemoJob.deleteOne({ _id: id });

    return deletedQueryObject;
  } catch (error) {
    return null;
  }
};

export async function demoGetChartsDataAction(): Promise<Array<{ date: string; count: number }>> {

  const threeMonthsAgo = dayjs().subtract(3, 'month').toDate();

  try {
    await connectToDB();

    const jobs: DemoJobType[] = await DemoJob.find({ createdAt: { $gte: threeMonthsAgo } }).sort({ createdAt: 'desc' });

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
    redirect('/demo-jobs');
  }
};

export async function demoGetStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {

  try {
    await connectToDB();

    const stats: { _id: string, count: number }[] = await DemoJob.aggregate(
      [
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
    redirect('/demo-jobs');
  }
};