/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";


type StatsCardType = {
  title: string,
  value: number
}

function StatsCard({title, value}: StatsCardType) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-4l font-extrabold text-primary mt-[0px!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
export default StatsCard;