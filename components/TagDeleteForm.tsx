import { FormEvent, useState } from 'react';
import ReactSelect from 'react-select/async';
import customStyles from 'utils/reactSelectStyles';
import qs from 'querystring';
import Button from './Button';
import Alert from './Alert';

const createSelectInput = (data: string[]) =>
  data.map((d) => ({ label: d, value: d }));
const extractTags = (data) => data.map((d) => d.value);

export default function TagDeleteForm() {
  const [value, setValue] = useState('');
  const [{ message, success }, setNotification] = useState({
    message: '',
    success: false,
  });
  const loadOptions = () =>
    fetch('/api/tag')
      .then((tags) => tags.json())
      .then((data) => Promise.resolve(createSelectInput(data)));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `/api/tag?${qs.stringify({ tags: extractTags(value) })}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      setNotification(data);
      setValue('');
    } catch (error) {
      setNotification(error);
    }
  };

  return (
    <>
      <form className="py-16" onSubmit={onSubmit}>
        <Alert
          show={Boolean(message)}
          duration={5000}
          autoHide
          onHide={() => setNotification({ message: '', success: false })}
          className={success ? 'bg-green-500' : 'bg-red-500'}
        >
          {message}
        </Alert>
        <ReactSelect
          defaultOptions
          isMulti
          value={value}
          onChange={(v) => setValue(v)}
          loadOptions={loadOptions}
          styles={customStyles}
        />
        <Button className="bg-gray-900 p-2 w-full mt-4" type="submit">
          Delete
        </Button>
      </form>
    </>
  );
}
