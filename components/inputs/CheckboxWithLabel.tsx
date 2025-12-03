"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
  message?: string;
  disabled?: boolean;
};

export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
  disabled = false,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex items-center gap-2">
          <FormLabel className="text-base mt-4 w-1/3" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <div className="flex items-center gap-2 mt-4">
            <FormControl>
              <Checkbox
                id={nameInSchema}
                checked={field.value}
                {...field}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            {message}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
