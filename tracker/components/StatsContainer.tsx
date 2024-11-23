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

  console.log(data);
  

  return (
    <div>StatsContainer</div>
  )
}
export default StatsContainer;

