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

export function DemoCustomFormField({ name, control }: DemoCustomFormFieldProps) {
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


type DemoCustomFormSelectProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  items: string[];
  labelText?: string;
};

export function DemoCustomFormSelect({
  name,
  control,
  items,
  labelText,
}: DemoCustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{labelText || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='bg-background'>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => {
                return (
                  <SelectItem key={item} value={item} >
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default DemoCustomFormSelect;