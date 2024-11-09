/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId, Types } from 'mongoose';
import * as z from 'zod';

export type JobType = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

// export type JobTypeWithStringId = {
//   _id: string;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   clerkId: string;
//   position: string;
//   company: string;
//   location: string;
//   status: string;
//   mode: string;
// };


export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
};

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
};

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;