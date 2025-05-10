import { demoGetAllJobsAction } from "@/utils/demoActions";


const JobsDemo = async () => {

  let jobs = await demoGetAllJobsAction({});

  if(jobs.length){
    jobs = jobs.map(job => {
      return JSON.parse(job);
    });
  } else {
    return <p className="capitalize">there are no jobs</p>
  };

  console.log(jobs);
  

  return (
    <div>JobsDemo</div>
  )
}
export default JobsDemo;