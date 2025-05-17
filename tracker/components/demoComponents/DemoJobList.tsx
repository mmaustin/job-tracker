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

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) return <h2 className="text-xl">Please Wait . . . </h2>
  if (parsedJobs.length < 1) return <h2 className="text-xl font-semibold font-serif">No Jobs Found . . . </h2>

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold font-serif'>
          {count <= 1 ? `Search Total: ${count} Job` : `Search Total: ${count} Jobs`}
          {/* You have {count} Total Job(s) */}
        </h2>
        {/* {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )} */}
      </div>
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