//import * as z from 'zod';

export type DemoJobType = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};