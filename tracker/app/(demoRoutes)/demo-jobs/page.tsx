import DemoJobList from "@/components/demoComponents/DemoJobList";
import DemoSearchForm from "@/components/demoComponents/DemoSearchForm";
import { demoGetAllJobsAction } from "@/utils/demoActions";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";

const JobsDemo = async () => {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['jobs', '', 'all', 1],
      queryFn: () => demoGetAllJobsAction({})
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <DemoSearchForm />
      <DemoJobList />
    </HydrationBoundary>
  )
}
export default JobsDemo;