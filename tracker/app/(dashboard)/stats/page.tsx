import { testMongoDB } from "@/utils/actions";



const StatsPage = async () => {
  await testMongoDB();
  return (
    <div>Stats Page</div>
  )
}
export default StatsPage;