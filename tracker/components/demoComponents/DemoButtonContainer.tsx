/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type DemoButtonContainerType = {
  currentPage: number,
  totalPages: number
};

const DemoButtonContainer = ({currentPage, totalPages}: DemoButtonContainerType) => {
  return (
    <div>DemoButtonContainer</div>
  )
}
export default DemoButtonContainer