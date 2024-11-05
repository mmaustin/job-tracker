import { getAllJobsAction } from "@/utils/actions";


const StatsPage = async () => {
  await getAllJobsAction({search: '',
  jobStatus: "pending",
  page: 1,
  limit: 10})

  return (
    <div>Stats Page</div>
  )
}
export default StatsPage;