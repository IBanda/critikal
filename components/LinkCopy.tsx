import { useEffect, useRef, useState } from 'react';

interface Props {
  id: string;
}
export default function LinkCopy({ id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAlert, setAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAlert(false), 1000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const onCopy = () => {
    navigator.clipboard.writeText(inputRef.current.value).then(() => {
      setAlert(true);
    });
  };
  return (
    <>
      <h5 className="block font-medium text-lg tracking-tighter mb-4">
        Form Link
      </h5>
      <div className="flex items-center">
        <input
          type="text"
          ref={inputRef}
          value={`http://localhost:3000/form/${id}`}
          className="bg-gray-100 p-2 md:w-80 focus:outline-none"
          readOnly
        />
        <div className="relative">
          {showAlert && (
            <div className="bg-gray-100 absolute text-xs p-1 bottom-12 left-1/2 transform -translate-x-1/2">
              Copied!
            </div>
          )}
          <button
            onClick={onCopy}
            type="button"
            className="focus:outline-none focus:ring-2 focus:border-indigo-300 p-2 border border-indigo-500"
          >
            <img className="w-6" src="/copy.png" alt="copy" />
          </button>
        </div>
      </div>
    </>
  );
}
