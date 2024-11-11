/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import {JobType} from '@/utils/types'


function JobsList() {
  const {data, isPending} = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobsAction({}),
  })

  let parsedJobs: JobType[] | undefined;
  if(data){
    parsedJobs = data.jobs.map(job => {
      return JSON.parse(job);
    });
    //parsedJobs = parsed
  };

  console.log(parsedJobs)
  // const parsedJobs = data?.jobs.map(job => {
  //   if(job){
  //     return JSON.parse(job);
  //   }
  // });
  // console.log(parsedJobs);
  
  return (
    <div>
      {
        parsedJobs ?
        parsedJobs.map((j)=>{
          return <p key={j._id}>{j.position}</p>
        }) : <p className="capitalize">there are no jobs!</p>
      }
      {/* {parsedJobs?.map((j,i)=>{
        return <p key={i}>{j.position}</p>
      })} */}
    </div>
  )
}
export default JobsList;