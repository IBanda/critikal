interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid md:grid-cols-2 h-full ">
      <div className="col-span-1 flex flex-col justify-center items-center py-20 container">
        <img className="w-24 mx-auto mb-8" src="logo.png" alt="logo" />
        {children}
      </div>
      <div className="col-span-1 hidden md:flex items-center justify-center bg-indigo-400 ">
        <img className="max-w-lg" src="/world.svg" alt="signup" />
      </div>
    </div>
  );
}
