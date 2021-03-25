interface Props {
  children: React.ReactNode;
  imgSrc: string;
}

export default function AuthLayout({ children, imgSrc }: Props) {
  return (
    <div className="grid md:grid-cols-5 h-full ">
      <div className="col-span-2 hidden md:flex flex-col items-center justify-center bg-gray-900 shadow-lg">
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
