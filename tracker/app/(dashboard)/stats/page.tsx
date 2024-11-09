import { getAllJobsAction } from "@/utils/actions";


const StatsPage = async () => {
  const returnedJobs = await getAllJobsAction({});

  const returnedParsedJobs: string[] = returnedJobs.jobs.map(job => {
    if(typeof job === 'string'){
      return JSON.parse(job);
    };
  });

  console.log(returnedParsedJobs);
  

  return (
    <div>Stats Page</div>
  )
}
export default StatsPage;