import DemoCreateJobForm from "@/components/demoComponents/DemoCreateJobForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


const DemoAddJob = () => {

  const queryClient = new QueryClient();
  
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DemoCreateJobForm />
      </HydrationBoundary>
    </>
    
  )
}
export default DemoAddJob;