/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { JobStatus, JobMode, createAndEditJobSchema, CreateAndEditJobType  } from '@/utils/demoTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { DemoCustomFormField, DemoCustomFormSelect } from './DemoFormComponents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDemoJobAction } from '@/utils/demoActions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


const DemoCreateJobForm = () => {

  const form = useForm<CreateAndEditJobType>({
      resolver: zodResolver(createAndEditJobSchema),
      defaultValues: {
        position: '',
        company: '',
        location: '',
        status: JobStatus.Pending,
        mode: JobMode.FullTime,
      },
    });

      const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

    const { mutate, isPending } = useMutation({
      mutationFn: (values: CreateAndEditJobType) => createDemoJobAction(values),
      onSuccess: data => {
        
        if (!data) {
          toast({ description: 'there was an error' });
          return;
        };
        toast({ description: 'job created' });
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        // queryClient.invalidateQueries({ queryKey: ['stats'] });
        // queryClient.invalidateQueries({ queryKey: ['charts'] });
  
        // router.push('/jobs');
      }
    });

    function onSubmit(values: CreateAndEditJobType) {
        mutate(values);
      };

  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=' p-8 rounded'>
            <h2 className="capitalize font-semibold text-4xl mb-6">
              add job
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
              <DemoCustomFormField name='position' control={form.control} />
              <DemoCustomFormField name='company' control={form.control} />
              <DemoCustomFormField name='location' control={form.control} />
    
              <DemoCustomFormSelect name='status' control={form.control} labelText='job status' items={Object.values(JobStatus)}
              />
              <DemoCustomFormSelect name='mode' control={form.control} labelText='job mode' items={Object.values(JobMode)}
              />
    
              <Button type='submit' className='self-end capitalize' disabled={isPending}>
                {isPending ? 'loading' : 'create job'}
              </Button>
            </div>
          </form>
        </Form>  
  )
};
export default DemoCreateJobForm;