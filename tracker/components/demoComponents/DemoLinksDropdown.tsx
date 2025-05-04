'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlignLeft } from 'lucide-react';
import { demoLinks } from "@/utils/demoLinks";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";

const DemoLinksDropdown = () => {

  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button variant={'outline'} size={'icon'}>
          <AlignLeft />
          <span className="sr-only">Toggle Links</span>
        </Button>
      </DropdownMenuTrigger>
      {pathname !== '/under-construction' ?
        <DropdownMenuContent className="w-52 md:hidden" align="start" sideOffset={25} >
          {demoLinks.map(link => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="flex items-center gap-x-2">
                  {link.icon} <span className="capitalize">{link.label}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
        :
        <DropdownMenuContent className="w-52 md:hidden" align="start" sideOffset={25} >
          <DropdownMenuItem >
            <Link href={'/'} className="flex items-center gap-x-2">
              <FaHome /> <span className="capitalize">home</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      }
    </DropdownMenu>
  )
}
export default DemoLinksDropdown;