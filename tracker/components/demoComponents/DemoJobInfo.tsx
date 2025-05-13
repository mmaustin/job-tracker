
type JobInfoType = {
  icon: React.ReactNode,
  text: string
}

const DemoJobInfo = ({icon, text}: JobInfoType) => {
  return (
    <div className="flex gap-x-2 items-center">
      {icon}
      {text}
    </div>
  )
}
export default DemoJobInfo;