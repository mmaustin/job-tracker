/* eslint-disable @typescript-eslint/no-unused-vars */
import JobsList from "@/components/JobsList";
import SearchForm from "@/components/SearchForm";
import { getAllJobsAction } from "@/utils/actions";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";


const JobsPage = async () => {

  const queryClient = new QueryClient();
  const returnedJobs = await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobsAction({})
  });
  //console.log(returnedJobs);
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
    <>
      <SearchForm />
      <JobsList />
    </>
    </HydrationBoundary>
  )
}
export default JobsPage;