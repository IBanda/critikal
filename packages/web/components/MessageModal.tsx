import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Alert from 'components/Alert';
import useFetch from 'lib/useFetch';
import getAlertColor from 'utils/notificationColors';
import Button from './Button';
import Modal from './Modal';

interface Props {
  id: string;
  onHide: () => void;
}

export default function MessageModal({ id, onHide }: Props) {
  const {
    fetcher,
    notification: { message, success, loading },
    setNotification,
    initialNotification,
  } = useFetch({ loadingMessage: '...processing' });
  const [action, setAction] = useState('');
  const { data, error } = useSWR(`/api/message?id=${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  const isLoading = !data && !error;
  const isHighPriority = data?.insights?.priority === 'high';

  const onUpdateStatus = async (event) => {
    const btn = event.target.closest('button').id;
    const status = btn === 'actionable' ? 'actionable' : 'resolved';
    setAction(status);
    await fetcher(`/api/message?id=${id}&status=${status}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setAction('');
    mutate('/api/message');
    mutate(`/api/message?id=${id}`);
  };

  const onDelete = async () => {
    setAction('delete');
    await fetch(`/api/message?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setAction('');
    mutate('/api/message');
    await new Promise((r) => setTimeout(r, 500));
    onHide();
  };

  return (
    <Modal show={Boolean(id)} onHide={onHide}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Alert
            show={Boolean(message)}
            duration={2000}
            autoHide
            onHide={() => setNotification(initialNotification)}
            className={`mt-2 ${getAlertColor(success, loading)}`}
          >
            {message}
          </Alert>
          <div>
            <span className="font-medium">Subject:</span>
            <div className="bg-indigo-100 p-2 my-2 rounded">
              <h1>{data.subject}</h1>
            </div>
          </div>
          <div>
            <span className="font-medium">Message:</span>
            <div className="max-h-36 overflow-auto bg-indigo-100 my-2 p-2 rounded">
              <div dangerouslySetInnerHTML={{ __html: data.message }} />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-medium">Priority:</span>
            <div
              className={`rounded ml-1 text-xs px-2 py-0.5 text-white bg-${
                isHighPriority ? 'red' : 'green'
              }-500`}
            >
              {data.insights.priority}
            </div>
          </div>
          <div className="mb-4">
            <ul className="flex flex-wrap max-h-12 overflow-auto">
              {data.insights.keyPhrases.map((phrase) => (
                <li
                  className="mr-1 mb-0.5 bg-green-500 rounded px-1.5 py-0.5 text-white text-xs"
                  key={phrase}
                >
                  {phrase}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              id="actionable"
              disabled={data.status === 'actionable'}
              onClick={onUpdateStatus}
              className="bg-gray-900 p-2"
            >
              {action === 'actionable' ? '...' : 'Actionable'}
            </Button>
            <Button
              onClick={onUpdateStatus}
              disabled={data.status === 'resolved'}
              id="resolve"
              className="bg-gray-900 p-2 "
            >
              {action === 'resolved' ? '...' : 'Resolve'}
            </Button>
            <Button onClick={onDelete} className="bg-gray-900 p-2 col-span-2">
              {action === 'delete' ? '...' : 'Delete'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
