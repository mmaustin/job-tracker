'use client'

import { Button } from "@/components/ui/button"

 
export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mb-2 font-serif text-xl">Something went wrong!</h2>
      <Button className="bg-blue-500" variant="secondary" size="default" onClick={() => reset()}>Try again</Button>
    </div>
  )
}