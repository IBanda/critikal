import React from 'react';

interface Props {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  [prop: string]: any;
}

export default function Input({ value, onChange, className, ...props }: Props) {
  return (
    <input
      onChange={onChange}
      value={value}
      className={` w-full  p-3 bg-indigo-100 rounded focus:outline-none focus:ring-2 focus:border-indigo-300 ${className}`}
      required
      {...props}
    />
  );
}
