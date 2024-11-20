/* eslint-disable @typescript-eslint/no-unused-vars */
import { getStatsAction } from "@/utils/actions";




const StatsPage = async () => {
  const stats = await getStatsAction();
  console.log(stats);
  
  
  return (
    <div>Stats Page</div>
  )
}
export default StatsPage;