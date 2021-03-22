interface Props {
  children: React.ReactNode;
  className: string;
  [prop: string]: any;
}

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={` rounded disabled:opacity-50 focus:outline-none text-white font-medium tracking-tight ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
