/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {TbLetterJ} from 'react-icons/tb'


const Sidebar = () => {
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <TbLetterJ className="mx-auto" />
    </aside>
  )
}
export default Sidebar;