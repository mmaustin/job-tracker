/* eslint-disable @typescript-eslint/no-unused-vars */
import {JobType} from '@/utils/types';


function JobCard({job}: {job: JobType}) {

  return (
    <div className='capitalize'>{job.location}</div>
  )
}
export default JobCard;