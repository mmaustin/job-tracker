/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { JobStatus } from "@/utils/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function SearchForm() {



  return (
    <form onSubmit={} className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg">
      <Input type="text" placeholder="Search Jobs" name="search" />
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
        {
          ['all', ...Object.values(JobStatus)].map(jobStatus => {
            return <SelectItem key={jobStatus} value={jobStatus}>
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
export default SearchForm;