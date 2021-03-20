import { TableData } from 'lib/interfaces';

export default function formatData(
  data,
  resultModifier?: (data: TableData[]) => TableData[]
): TableData[] {
  const dataCopy = [...data];
  const result = dataCopy.map((item) => ({
    id: item.id,
    email: item.senderEmail,
    subject: item.subject,
    priority: item.insights.priority,
    keyPhrases: item.insights.keyPhrases,
    hasListedTags: false,
    date: item.created_on,
    status: item.status,
  }));
  return resultModifier ? resultModifier(result) : result;
}
