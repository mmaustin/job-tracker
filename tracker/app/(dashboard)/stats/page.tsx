/* eslint-disable @typescript-eslint/no-unused-vars */
import { getChartsDataAction } from "@/utils/actions";




const StatsPage = async () => {
  const chartData = await getChartsDataAction();
  console.log(chartData);
  
  
  return (
    <div>Stats Page</div>
  )
}
export default StatsPage;