export default function Success() {
  return (
    <div>
      <div className="bg-gray-900 text-center text-white px-2 py-8">
        <h1 className=" text-lg md:text-3xl tracking-tight font-bold whitespace-nowrap">
          Message has successfully been sent !
        </h1>
        <p className="text-lg">You can proceed to close this tab</p>
      </div>
      <img
        className="w-72 md:w-96  mx-auto mt-16"
        src="/Sent-Message-rafiki.svg"
        alt="success"
      />
    </div>
  );
}
