import React from 'react';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  [prop: string]: any;
}

export default function Input({ value, onChange, ...props }: Props) {
  return (
    <input
      onChange={onChange}
      value={value}
      className="my-2 w-full border border-indigo-300 p-3 rounded focus:outline-none focus:ring-2 focus:border-indigo-300"
      required
      {...props}
    />
  );
}
