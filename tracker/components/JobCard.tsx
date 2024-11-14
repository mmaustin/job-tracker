/* eslint-disable @typescript-eslint/no-unused-vars */
import {JobType} from '@/utils/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './JobInfo';
import DeleteJobBtn from './DeleteJobBtn';


function JobCard({job}: {job: JobType}) {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <div className='capitalize'>{job.location}</div>
  )
}
export default JobCard;