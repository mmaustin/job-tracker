/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateJobForm from "@/components/CreateJobForm";
import { createJobAction } from "@/utils/actions";



const AddJobPage = () => {

  async function testJobHander(){
    await createJobAction()
  };
  testJobHander();

  return (
    <>
     {/* <button className="bg-red-400" onClick={testJobHander}>test here</button> */}
      <CreateJobForm />
    </>
  )
};
export default AddJobPage;