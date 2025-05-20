/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { JobStatus } from "@/utils/demoTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DemoSearchForm = () => {

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    
    const params = new URLSearchParams();
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`)
  };

  return (
        <form onSubmit={handleSubmit} className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg">
          <p className="flex justify-center items-center m-0 border rounded-lg bg-background font-bold font-serif">Search By Category</p>
          {/* Temporarily hidden */}
          <input className="bg-background " type="text" placeholder="Search Jobs" name="search" hidden defaultValue={search} />
          <Select name="jobStatus" defaultValue={jobStatus}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent >
            {
              ['all', ...Object.values(JobStatus)].map(jobStatus => {
                return <SelectItem className="bg-background" key={jobStatus} value={jobStatus}>
                  {jobStatus}
                </SelectItem>
              })
            }
            </SelectContent>
          </Select>
          <Button type="submit" >Search</Button>
        </form>
  )
}
export default DemoSearchForm