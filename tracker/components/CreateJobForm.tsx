/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { JobStatus, JobMode, createAndEditJobSchema, CreateAndEditJobType } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { CustomFormField, CustomFormSelect } from './FormComponents';


const CreateJobForm = () => {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues : {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType){
    console.log(values);
  };

  return (
    <div>CreateJobForm</div>
  )
}
export default CreateJobForm;
