import { TableData } from 'lib/interfaces';

export default function modifyResult(tags: string[]) {
  const tagsLength = tags.length;
  return (data: TableData[]) => {
    const copy = [...data];
    copy.forEach((dataItem) => {
      const set = new Set([
        ...tags.map((t) => t.toLowerCase()),
        ...dataItem.keyPhrases.map((p) => p.toLowerCase()),
      ]);
      if (!(set.size === tagsLength + dataItem.keyPhrases.length)) {
        // eslint-disable-next-line no-param-reassign
        dataItem.hasListedTags = true;
      }
    });
    return copy;
  };
}
