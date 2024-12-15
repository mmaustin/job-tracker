import { Button } from "@/components/ui/button";
import Link from "next/link";
//import Image from "next/image";



export default function Home() {
  return (
    <main className="display flex justify-center items-center h-[300px]">
      <Button size={'lg'} asChild>
        <Link href={'/add-job'} >
          Get Started
        </Link>
      </Button>
    </main>
  );
};