export default function Success() {
  return (
    <div>
      <div className="bg-indigo-500 text-center text-white px-2 py-8">
        <h1 className=" text-lg md:text-3xl tracking-tight font-bold whitespace-nowrap">
          Message has successfully been sent !
        </h1>
        <p className="text-lg">You can proceed to close this tab</p>
      </div>
      <img
        className="w-40 md:w-72 max-w-xs mx-auto mt-16"
        src="/success.svg"
        alt="success"
      />
    </div>
  );
}
