import { MdConstruction } from "react-icons/md";



const UnderConstruction = () => {
  return (
    <div className="h-96 w-full flex flex-col justify-center items-center gap-8">
      <div className="capitalize text-xl font-serif font-semibold">demonstration mode is under construction</div>
      <MdConstruction className="h-[30%] w-[30%] text-yellow-400"/>
    </div>
   
  )
}
export default UnderConstruction;