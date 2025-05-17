/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { demoGetAllJobsAction } from "@/utils/demoActions";
import { useQuery } from "@tanstack/react-query";
import { DemoJobType } from '@/utils/demoTypes';
import DemoJobCard from "./DemoJobCard";
import { useSearchParams } from "next/navigation";

const DemoJobList = () => {

  const searchParams = useSearchParams();

  const search = ''; //search params not used here
  
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, jobStatus, pageNumber],
    queryFn: () => demoGetAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  let parsedJobs: DemoJobType[] | DemoJobType | undefined | [];

  if (data) {
    parsedJobs = data.jobs.map(job => {
      return JSON.parse(job);
    });
  } else {
    parsedJobs = [];
  };

  

  if (isPending) return <h2 className="text-xl">Please Wait . . . </h2>
  if (parsedJobs.length < 1) return <h2 className="text-xl font-semibold font-serif">No Jobs Found . . . </h2>

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {
          parsedJobs.map((job) => {
            return <DemoJobCard key={job._id} job={job} />
          })
        }
      </div>
    </>

  )
};
export default DemoJobList;