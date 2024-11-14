/* eslint-disable @typescript-eslint/no-unused-vars */
import {JobType} from '@/utils/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './JobInfo';
import DeleteJobBtn from './DeleteJobBtn';
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';


function JobCard({job}: {job: JobType}) {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className='bg-muted' >
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
      <CardFooter className='flex gap-4' >
        <Button asChild size="sm" >
          <Link href={`/jobs/${job._id}`} >edit</Link>
        </Button>
        <DeleteJobBtn />
      </CardFooter>
    </Card>
  )
}
export default JobCard;