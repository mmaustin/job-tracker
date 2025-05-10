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

