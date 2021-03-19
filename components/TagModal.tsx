import Modal from './Modal';
import TagForm from './TagForm';

interface Props {
  show: boolean;
  onHide: () => void;
}
export default function TagModal({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide}>
      <TagForm />
    </Modal>
  );
}
