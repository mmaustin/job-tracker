import DemoJobList from "@/components/demoComponents/DemoJobList";
import { demoGetAllJobsAction } from "@/utils/demoActions";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";

const JobsDemo = async () => {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['jobs', '', 'all', 1],
      queryFn: () => demoGetAllJobsAction({})
    });

  // let jobs = await demoGetAllJobsAction({});

  // if(jobs.length){
  //   jobs = jobs.map(job => {
  //     return JSON.parse(job);
  //   });
  // } else {
  //   return <p className="capitalize">there are no jobs</p>
  // };

  // console.log(jobs);
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <DemoJobList />
    </HydrationBoundary>
  )
}
export default JobsDemo;