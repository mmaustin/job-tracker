/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { demoDeleteJobAction } from "@/utils/demoActions";


const DemoDeleteJobBtn = ({id}: {id: string}) => {
  return (
    <div>DemoDeleteJobBtn</div>
  )
}
export default DemoDeleteJobBtn