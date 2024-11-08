import { getAllJobsAction } from "@/utils/actions";


const StatsPage = async () => {
  const returnedJobs = await getAllJobsAction({});
  console.log(returnedJobs);
  

  return (
    <div>Stats Page</div>
  )
}
export default StatsPage;