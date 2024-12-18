
'use client'

import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { JobType } from '@/utils/types';
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";
import ButtonContainer from "./ButtonContainer";

function JobsList() {

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  })

  let parsedJobs: JobType[] | JobType | undefined | [];
  if (data) {
    parsedJobs = data.jobs.map(job => {
      return JSON.parse(job);
    });
  } else {
    parsedJobs = [];
  }

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) return <h2 className="text-xl">Please Wait . . . </h2>
  if (parsedJobs.length < 1) return <h2 className="text-xl">No Jobs Found . . . </h2>

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold'>
          You have {count} Total Job(s)
        </h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {
          parsedJobs.map((job) => {
            return <JobCard key={job._id} job={job} />
          })
        }
      </div>
    </>
  )
}
export default JobsList;