/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { getStatsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";

function StatsContainer() {
  const {data} = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction()
  });


  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title='pending jobs' value={data?.pending || 0} />
      <StatsCard title='pending jobs' value={data?.interview || 0} />
      <StatsCard title='pending jobs' value={data?.declined || 0} />
    </div>
  )
}
export default StatsContainer;

