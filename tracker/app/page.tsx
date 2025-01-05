import { Button } from "@/components/ui/button";
import Link from "next/link";
//import Image from "next/image";



export default function Home() {
  return (
        <div className="mx-5 flex flex-col justify-center items-center">
      {/* <div className="my-10 w-full flex justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <ThemeToggle />
        </div>
      </div> */}
      <div className="mt-32 flex justify-center items-center">
        <div className="max-w-3xl flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl font-bold uppercase border-t-2 border-dotted text-center">
            Just One
            <p className="py-6 text-sm md:text-xl font-normal leading-loose normal-case border-t-2 border-dotted">You may have sent out hundreds, thousands of applications and resumes.  While frustrating, remember all it takes is one!  Track all of your applications in the Just One job tracker.</p>
          </h1>
          <div className="flex flex-wrap justify-center items-center">
            <Button size={'lg'} asChild>
        <Link href={'/add-job'} >
          Start Tracking
        </Link>
      </Button>
            {/* <div className="tooltip tooltip-bottom mt-10" data-tip="Outlook Is Not Recommended. May Experience Redirect Issues On Login.">
              <IoInformationCircle className="m-0" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
    // <main className="display flex justify-center items-center h-[300px]">
    //   <Button size={'lg'} asChild>
    //     <Link href={'/add-job'} >
    //       Get Started
    //     </Link>
    //   </Button>
    // </main>
  );
};