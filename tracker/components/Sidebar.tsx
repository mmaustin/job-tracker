/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { TbLetterJ } from 'react-icons/tb'


const Sidebar = () => {

  const pathname = usePathname();

  return (
    <aside className="py-4 px-8 bg-muted h-full">
      {/* <TbLetterJ className="mx-auto" /> */}
      <h2 className="font-bold display flex justify-center text-blue-600 text-2xl">Just One</h2>
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map(link => {
          return <Button asChild key={link.href} variant={pathname === link.href ? 'default' : 'link'}>
            <Link href={link.href} className="flex items-center gap-x-2">
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </Button>
        })}
      </div>
    </aside>
  )
}
export default Sidebar;