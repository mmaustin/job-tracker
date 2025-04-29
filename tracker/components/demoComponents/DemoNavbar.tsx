import DemoLinksDropdown from "./DemoLinksDropdown";
import ThemeToggle from "../ThemeToggle";

const DemoNavbar = () => {
  return (
    <nav className="py-4 sm:px-16 md:px-24 px-4 bg-muted flex items-center justify-between">
      <div className="">
        <DemoLinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
      </div>
    </nav>
  )
}
export default DemoNavbar;