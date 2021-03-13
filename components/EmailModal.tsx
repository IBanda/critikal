import useSWR from 'swr';
import Modal from './Modal';

interface Props {
  id: string;
  onHide: () => void;
}

export default function EmailModal({ id, onHide }: Props) {
  const { data, error } = useSWR(`/api/email?id=${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  const isLoading = !data && !error;
  const isHighPriority = data?.insights?.priority === 'high';

  return (
    <Modal show={Boolean(id)} onHide={onHide}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div>
            <span className="font-medium">Email:</span>
            <div className="bg-gray-100 p-2 my-2 rounded">
              <h1>{data.senderEmail}</h1>
            </div>
          </div>
          <div>
            <span className="font-medium">Subject:</span>
            <div className="bg-gray-100 p-2 my-2 rounded">
              <h1>{data.subject}</h1>
            </div>
          </div>
          <div>
            <span className="font-medium">Message:</span>
            <div className="h-36 overflow-auto bg-gray-100 my-2 p-2 rounded">
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
            <ul className="flex flex-wrap">
              {data.insights.keyPhrases.map((phrase) => (
                <li
                  className="mr-1 bg-indigo-500 rounded px-1.5 py-0.5 text-white text-xs"
                  key={phrase}
                >
                  {phrase}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="bg-green-500 rounded text-white font-medium tracking-tight p-2 focus:outline-none"
            >
              Actionable
            </button>
            <button
              type="button"
              className="bg-indigo-500 rounded text-white font-medium tracking-tight p-2 focus:outline-none"
            >
              Resolve
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
