'use client'

import { demoGetStatsAction } from "@/utils/demoActions";
import { useQuery } from "@tanstack/react-query";
import DemoStatsCard, { DemoStatsLoadingCard } from "./DemoStatsCard";

const DemoStatsContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ['stats'],
    queryFn: () => demoGetStatsAction()
  });

  if (isPending)
    return (
      <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
        <DemoStatsLoadingCard />
        <DemoStatsLoadingCard />
        <DemoStatsLoadingCard />
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <DemoStatsCard title='pending' value={data?.pending || 0} />
      <DemoStatsCard title='interviews' value={data?.interview || 0} />
      <DemoStatsCard title='declined' value={data?.declined || 0} />
    </div>
  )
}
export default DemoStatsContainer