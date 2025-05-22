import DemoChartsContainer from "@/components/demoComponents/DemoChartsContainer";
import { demoGetChartsDataAction } from "@/utils/demoActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


const DemoStats = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => demoGetChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DemoChartsContainer />
    </HydrationBoundary>
  )
}
export default DemoStats