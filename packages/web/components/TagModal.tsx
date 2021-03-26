import dynamic from 'next/dynamic';
import { useState } from 'react';
import Modal from './Modal';

const TagDeleteForm = dynamic(() => import('./TagDeleteForm'), { ssr: false });
const TagForm = dynamic(() => import('./TagForm'), { ssr: false });

interface Props {
  show: boolean;
  onHide: () => void;
}
export default function TagModal({ show, onHide }: Props) {
  const [tab, setTab] = useState('add');
  return (
    <Modal show={show} onHide={onHide}>
      <div className="border-b border-blue-100">
        <button
          type="button"
          onClick={() => setTab('add')}
          className={`mr-1 relative z-10 tracking-tight rounded-tl rounded-tr -mb-0.5  p-1 focus:outline-none ${
            tab === 'add' ? 'border border-mixed bg-white' : ''
          }`}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setTab('delete')}
          className={` tracking-tight rounded-tl rounded-tr -mb-0.5  focus:outline-none  p-1 ${
            tab === 'delete' ? 'border border-mixed bg-white' : ''
          }`}
        >
          Delete
        </button>
      </div>
      <div className={`${tab === 'add' ? 'block' : 'hidden'}`}>
        <TagForm />
      </div>
      <div className={`${tab === 'delete' ? 'block' : 'hidden'}`}>
        <TagDeleteForm />
      </div>
    </Modal>
  );
}
