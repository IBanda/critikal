import { XIcon } from '@primer/octicons-react';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onHide: () => void;
}

export default function Modal({ children, show, onHide }: Props) {
  return (
    show && (
      <>
        <div className="fixed bg-black bg-opacity-50 left-0 top-0 h-full w-full" />
        <div
          aria-modal="true"
          tabIndex={-1}
          role="dialog"
          className="fixed flex items-center justify-center left-0 top-0 h-full w-full"
        >
          <div>
            <div className="bg-white rounded p-4 tracking-tight text-sm w-80 md:w-96 ">
              <div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onHide}
                    className="bg-red-500 rounded px-2 py-1 text-white focus:outline-none"
                  >
                    <XIcon />
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
