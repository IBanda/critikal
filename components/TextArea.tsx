import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onTextChange: (value: string) => void;
}
export default function TextArea({ value, onChange, onTextChange }: Props) {
  const onInternalChange = (content, _, __, editor) => {
    onChange(content);
    onTextChange(editor.getText());
  };
  return (
    <ReactQuill
      id="message"
      value={value}
      theme="snow"
      onChange={onInternalChange}
      className="mt-2 font-sans text-base"
    />
  );
}
