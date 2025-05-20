/* eslint-disable @typescript-eslint/no-unused-vars */
import { DemoJobType } from '@/utils/demoTypes';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import DemoJobInfo from './DemoJobInfo';
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';

const DemoJobCard = ({job}: {job: DemoJobType}) => {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle >{job.position}</CardTitle>
        <CardDescription >{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4 capitalize font-serif'>
        <DemoJobInfo icon={<Briefcase />} text={job.mode}/>
        <DemoJobInfo icon={<MapPin />} text={job.location}/>
        <DemoJobInfo icon={<CalendarDays />} text={date}/>
        <Badge className='w-24 sm:32 md:w-24 lg:w-32 justify-center' >
          <DemoJobInfo icon={<RadioTower className='w-4 h-4 ' />} text={job.status}/>
        </Badge>
      </CardContent>
      <CardFooter className='flex gap-4' >
        <Button size="sm" >Delete </ Button>
      </CardFooter>
    </Card>
  )
}
export default DemoJobCard;