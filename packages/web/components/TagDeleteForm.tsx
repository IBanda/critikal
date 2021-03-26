import { FormEvent, useState } from 'react';
import ReactSelect from 'react-select';
import customStyles from 'utils/reactSelectStyles';
import qs from 'querystring';
import useFetch from 'lib/useFetch';
import getAlertColor from 'utils/notificationColors';
import useSWR from 'swr';
import Button from './Button';
import Alert from './Alert';

const createSelectInput = (data: string[]) =>
  data?.map((d) => ({ label: d, value: d }));

const extractTags = (data) => data.map((d) => d.value);

export default function TagDeleteForm() {
  const [value, setValue] = useState('');
  const {
    fetcher,
    notification: { message, success, loading },
    setNotification,
    initialNotification,
  } = useFetch({ loadingMessage: '...processing' });
  const { data, mutate } = useSWR(
    '/api/tag',
    (url) => fetch(url).then((r) => r.json()),
    {
      revalidateOnMount: true,
    }
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await fetcher(`/api/tag?${qs.stringify({ tags: extractTags(value) })}`, {
      method: 'DELETE',
    });
    setValue('');
    mutate();
  };
  return (
    <>
      <form className="py-16" onSubmit={onSubmit}>
        <Alert
          show={Boolean(message)}
          duration={5000}
          autoHide
          onHide={() => setNotification(initialNotification)}
          className={getAlertColor(success, loading)}
        >
          {message}
        </Alert>
        <ReactSelect
          defaultOptions
          isMulti
          value={value}
          onChange={(v) => setValue(v)}
          options={data ? createSelectInput(data) : []}
          styles={customStyles}
        />
        <Button
          disabled={!value.length}
          className="bg-gray-900 p-2 w-full mt-4"
          type="submit"
        >
          Delete
        </Button>
      </form>
    </>
  );
}
