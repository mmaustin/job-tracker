/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { JobStatus } from "@/utils/demoTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DemoSearchForm = () => {

  const searchParams = useSearchParams();
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const jobStatus = formData.get('jobStatus') as string;
    
    const params = new URLSearchParams();
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`)
  };

  return (
    <div>DemoSearchForm</div>
  )
}
export default DemoSearchForm