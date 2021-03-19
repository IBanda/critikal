import { useState } from 'react';
import Button from 'components/Button';
import TagModal from './TagModal';

export default function TagModalBtn() {
  const [showModal, setOnShowModal] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => setOnShowModal(true)}
        className="py-2 px-3  text-sm "
      >
        <span className="hidden sm:inline">Key</span> Phrases
      </Button>
      {showModal && (
        <TagModal show={showModal} onHide={() => setOnShowModal(false)} />
      )}
    </>
  );
}
