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
    <div>DemoCreateJobForm</div>
  )
}
export default DemoCreateJobForm;