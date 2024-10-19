/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserButton } from "@clerk/nextjs";
import LinksDropdown from "./LinksDropdown";
import ThemeToggle from "./ThemeToggle";



const Navbar = () => {
  return (
    <nav className="bg-muted py-4 sm:px-16 md:px-24 px-4 flex items-center justify-between">
      <LinksDropdown />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  )
}
export default Navbar;