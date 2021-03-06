export default function Success() {
  return (
    <div className="container">
      <div className="bg-indigo-500 text-center text-white px-2 py-12">
        <h1 className="text-3xl tracking-tight font-bold">
          Message has successfully been sent !
        </h1>
        <p className="text-lg">You can proceed to close this tab</p>
      </div>
      <img
        className="max-w-xs mx-auto mt-16"
        src="/success.svg"
        alt="success"
      />
    </div>
  );
}
