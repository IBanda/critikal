interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid md:grid-cols-3 h-full ">
      <div className="col-span-1 hidden md:flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 via-red-500 to-indigo-500">
        <h1 className="text-white mb-8 font-bold tracking-tighter text-center text-5xl">
          Turn your inbox into a feeback system.
        </h1>
        <img className="max-w-sm" src="/world.svg" alt="signup" />
      </div>
      <div className="col-span-2 flex flex-col  justify-center items-center py-20 container">
        <img className="w-24 mx-auto mb-8" src="logo.png" alt="logo" />
        {children}
      </div>
    </div>
  );
}
