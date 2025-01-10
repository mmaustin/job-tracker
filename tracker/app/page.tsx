import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import jobCard from "@/public/job-card.png"



export default function Home() {
  return (
    <div className="mx-5 flex flex-col justify-center items-center">
      <div className="rounded-lg mt-10">
        <Image
          className="h-[175px] w-[275px] sm:h-[200px] sm:w-[300px] object-contain border border-base-300/50 hover:border-neutral-800 rounded-lg bg-black"
          src={jobCard}
          alt="create author profile form"
          priority
          height={265}
          width={198}
        />
      </div>
      <div className="mt-10 flex justify-center items-center">
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
  );
};