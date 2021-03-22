import { Opinion } from 'lib/textAnalytics';

export default function underlineOpinions(
  opinions: Opinion[],
  htmlMessage: string
) {
  let temp = htmlMessage;
  opinions.forEach((opinion) => {
    temp = temp.replace(
      opinion.text,
      `<u title="${opinion.opinion}">${opinion.text}</u>`
    );
  });
  return temp;
}
