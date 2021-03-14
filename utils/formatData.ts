import { TableData } from 'lib/interfaces';

export default function formatData(data): TableData[] {
  const dataCopy = [...data];
  return dataCopy.map((item) => ({
    id: item.id,
    email: item.senderEmail,
    subject: item.subject,
    priority: item.insights.priority,
    date: item.created_on,
    status: item.status || '',
  }));
}
