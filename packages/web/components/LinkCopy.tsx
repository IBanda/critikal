import { CopyIcon } from '@primer/octicons-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  id: string;
}
export default function LinkCopy({ id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAlert, setAlert] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setAlert(false), 1000);
    return () => clearTimeout(timer);
  }, [showAlert]);
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const onCopy = () => {
    navigator.clipboard.writeText(inputRef.current.value).then(() => {
      setAlert(true);
    });
  };
  return (
    <>
      <h5 className="block font-medium text-white text-lg tracking-tighter mb-4">
        Form Url
      </h5>
      <div className="flex items-center rounded relative">
        <input
          type="text"
          ref={inputRef}
          value={`${origin}/form/${id}`}
          className="bg-gray-100 p-2 md:w-80 focus:outline-none lg:text-sm text-indigo-900"
          onChange={(e) => setOrigin(e.target.value)}
          disabled
        />
        <div className="absolute right-0 bg-gray-100">
          {showAlert && (
            <div className="bg-indigo-100 absolute text-xs p-1 bottom-10 left-1/2 transform -translate-x-1/2">
              Copied!
            </div>
          )}
          <button
            onClick={onCopy}
            type="button"
            className="focus:outline-none focus:ring-2 focus:border-indigo-300 py-1 px-2"
          >
            <CopyIcon />
          </button>
        </div>
      </div>
    </>
  );
}
