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

    return jobsAsStrings;

  } catch (error) {
    console.error(error);
    return ['there', 'was', 'an', 'error'];
  }
}