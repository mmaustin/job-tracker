/* eslint-disable @typescript-eslint/no-unused-vars */
import { Control } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '../ui/input';

type DemoCustomFormFieldProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export function CustomFormField({ name, control }: DemoCustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input {...field} className='bg-background capitalize'/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};