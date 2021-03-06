import { FormEvent, useRef, useState } from 'react';
import { initialNotification } from 'lib/useFetch';
import getAlertColor from 'utils/notificationColors';
import { mutate } from 'swr';
import Button from './Button';
import CreateTagInput, { CreatableSelectValue } from './CreateTagInput';
import Input from './Input';
import Alert from './Alert';

function extractColumns(columns: string): string[] {
  return columns.split(',').map((item) => item.toLowerCase());
}

function extractTags(tags: CreatableSelectValue[]): string[] {
  return tags.map((tag) => tag.value.toLowerCase());
}

export default function TagForm() {
  const [file, setFIle] = useState(null);
  const [tags, setTags] = useState([]);
  const [cols, setCols] = useState('');
  const [{ message, success, loading }, setNotification] = useState(
    initialNotification
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const onTagCreate = (newTags: CreatableSelectValue[]) => {
    setTags(extractTags(newTags));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('csvFile', file);

    if (tags.length) {
      formData.append('tags', JSON.stringify(tags));
    }
    if (cols.length) {
      formData.append('cols', JSON.stringify(extractColumns(cols)));
    }

    try {
      setNotification({
        message: '...Uploading',
        success: false,
        loading: true,
      });
      const res = await fetch('/api/tag', {
        method: 'POST',
        body: formData,
      });
      const data = await res;

      if (data.ok) {
        setNotification({
          message: 'Tags were successfully added',
          success: true,
          loading: false,
        });
        mutate('/api/tag');
        setCols('');
        setFIle(null);
        inputRef.current.value = null;
        setTags([]);
      }
    } catch (error) {
      setNotification({
        message: 'Something went wrong',
        success: false,
        loading: false,
      });
    }
  };

  return (
    <form className="max-w-md" onSubmit={onSubmit}>
      <Alert
        show={Boolean(message)}
        duration={2000}
        autoHide
        onHide={() => setNotification(initialNotification)}
        className={`${getAlertColor(success, loading)} mt-4`}
      >
        {message}
      </Alert>
      <h1 className="text-center font-medium text-lg">Upload your files</h1>
      <h3 className="text-sm text-gray-400 text-center">CSV only</h3>
      <div className="relative p-4 my-4 h-28 w-full bg-white border border-dashed border-blue-300  rounded">
        <div className="flex flex-col items-center">
          <img className="w-12 h-12" src="/file.png" alt="file" />
          <h1 className="text-gray-400">
            {file?.name ? file?.name : 'Drag & Drop your file here'}
          </h1>
        </div>
        <input
          className="z-10 cursor-pointer absolute left-0 top-0 w-full h-full opacity-0  "
          onChange={(e) => setFIle(e.target.files[0])}
          type="file"
          name="phraseFile"
          ref={inputRef}
        />
      </div>
      {Boolean(file) && (
        <>
          <Input
            id="columns"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
          />

          <span className="text-xs text-gray-500">
            Enter comma seperated CSV columns you wish to add
          </span>
        </>
      )}
      <div className="text-center my-2 font-medium text-xs text-gray-400">
        OR
      </div>
      <CreateTagInput tags={tags} onTagCreate={onTagCreate} />
      <Button
        disabled={!tags.length && !file}
        type="submit"
        className="bg-gray-900 p-2 w-full mt-4"
      >
        Upload
      </Button>
    </form>
  );
}
