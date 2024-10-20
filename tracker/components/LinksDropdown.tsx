/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AlignLeft } from 'lucide-react';
import { links } from "@/utils/links";

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button variant={'outline'} size={'icon'}>
          <AlignLeft />
          <span className="sr-only">Toggle Links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 md:hidden" align="start" sideOffset={25} >
        {links.map(link => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown;