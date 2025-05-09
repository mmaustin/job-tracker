'use client'

import { demoLinks } from "@/utils/demoLinks";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";


const DemoSidebar = () => {

  const pathname = usePathname();

  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <h2 className="font-serif display flex justify-center text-2xl italic">Just One</h2>
      {pathname !== '/under-construction' ?
        <div className="flex flex-col mt-20 gap-y-4">
          {demoLinks.map(link => {
            return <Button asChild key={link.href} variant={pathname === link.href ? 'secondary' : 'ghost'}>
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          })}
        </div> :
        <div className="flex flex-col mt-20 gap-y-4">
          <Button asChild variant={'secondary'}>
            <Link href={'/'} className="flex items-center gap-x-2">
              <FaHome /> <span className="capitalize">Home</span>
            </Link>
          </Button>
        </div>
      }
    </aside>
  )
}
export default DemoSidebar;