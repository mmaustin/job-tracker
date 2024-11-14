/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { JobType } from '@/utils/types';
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";


function JobsList() {

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  })

  let parsedJobs: JobType[] | undefined;
  if (data) {
    parsedJobs = data.jobs.map(job => {
      return JSON.parse(job);
    });
  } else {
    parsedJobs = undefined
  }

  if (isPending) return <h2 className="text-xl">Please Wait . . . </h2>
  if (!parsedJobs) return <h2 className="text-xl">No Jobs Found . . . </h2>

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {
          // parsedJobs ?
          parsedJobs.map((job) => {
            return <JobCard key={job._id} job={job} />
          })
          // : <h2 className="text-xl">No Jobs Found . . . </h2>
        }
      </div>
    </>
  )
}
export default JobsList;