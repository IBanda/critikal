import { TableData } from 'lib/interfaces';
import includes from './includes';

export default function modifyResult(tags: string[]) {
  // const tagsLength = tags.length;
  return (data: TableData[]) => {
    const copy = [...data];
    copy.forEach((dataItem) => {
      if (includes(tags, dataItem.keyPhrases).length) {
        // eslint-disable-next-line no-param-reassign
        dataItem.hasListedTags = true;
      }
    });
    return copy;
  };
}
