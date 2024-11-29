/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

type ButtonContainerProps = {
  currentPages: number,
  totalPages: number,
};

function ButtonContainer({ currentPages, totalPages }: ButtonContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      jobStatus: searchParams.get('jobStatus') || '',
      page: String(page),
    };

    const params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };


  return (
    <div>ButtonContainer</div>
  )
}
export default ButtonContainer