interface Props {
  children: React.ReactNode;
  className: string;
  [prop: string]: any;
}

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={`rounded focus:outline-none text-white font-medium tracking-tight ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
