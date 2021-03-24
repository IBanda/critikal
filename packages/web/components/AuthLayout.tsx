interface Props {
  children: React.ReactNode;
  imgSrc: string;
}

export default function AuthLayout({ children, imgSrc }: Props) {
  return (
    <div className="grid md:grid-cols-5 h-full ">
      <div className="col-span-2 hidden md:flex flex-col items-center justify-center bg-gray-900 shadow-lg">
        <h1 className="text-white  font-bold tracking-tighter text-center text-5xl">

        Insights from your inbox
        </h1>
        <h2 className="text-lg text-white font-medium tracking-tighter">
          It's in the Details
        </h2>
        <img className="max-w-md" src={`/${imgSrc}.svg`} alt="messages" />
      </div>
      <div className="col-span-3 flex flex-col  justify-center items-center py-20 container">
        <div className="bg-gray-900 shadow-inner p-2 text-white tracking-tight font-bold mb-8  text-2xl">
          Critikal
        </div>
        {children}
      </div>
    </div>
  );
}
