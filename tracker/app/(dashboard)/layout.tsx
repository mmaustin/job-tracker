/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PropsWithChildren } from 'react';


const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='grid md:grid-cols-5'>
      <div className="hidden md:block md:col-span-1 md:min-h-screen">
        <Sidebar />
      </div>
      <div className="md:col-span-4">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 md:px-16">
          {children}
        </div>
      </div>
    </main>
  )
}
export default layout;