import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type DemoStatsCardType = {
  title: string,
  value: number
};

const DemoStatsCard = ({title, value}: DemoStatsCardType) => {
  return (
    <div>DemoStatsCard</div>
  )
}
export default DemoStatsCard