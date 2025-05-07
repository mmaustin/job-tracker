import DemoCreateJobForm from "@/components/CreateJobForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


const DemoAddJob = () => {

  const queryClient = new QueryClient();
  
  return (
    <>
      <p>the right place</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DemoCreateJobForm />
      </HydrationBoundary>
    </>
    
  )
}
export default DemoAddJob;