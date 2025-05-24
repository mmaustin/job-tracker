import DemoNavbar from '@/components/demoComponents/DemoNavbar';
import DemoSidebar from '@/components/demoComponents/DemoSidebar';
import { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='grid md:grid-cols-5'>
      <div className="hidden md:block md:col-span-1 md:min-h-screen">
        <DemoSidebar />
      </div>
      <div className="md:col-span-4">
        <DemoNavbar />
        <div className="py-16 px-4 sm:px-8 md:px-16">
        <p className='m-0 capitalize text-[11px] mb-6 text-center font-serif italic'>auth and full cRUD capabilities available upon sign in. delete and create here with abandon!</p>
          {children}
        </div>
      </div>
    </main>
  )
}
export default layout;