'use client';

import { getChartsDataAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

function ChartsContainer() {
  const {data, isPending} = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction()
  });

  if (isPending) return <h2 className='text-xl font-medium'>Please Wait . . . </h2>
  if(!data || data.length < 1) return null;

  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>
        Monthly Applications <span className='text-sm'>(last 3 months)</span>
      </h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#2563eb' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ChartsContainer