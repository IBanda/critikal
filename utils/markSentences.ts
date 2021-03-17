export default function markSentences(
  sentences: string[],
  htmlMessage: string
) {
  let temp = htmlMessage;
  sentences.forEach((sentence) => {
    temp = temp.replace(new RegExp(sentence), `<mark>${sentence}</mark>`);
  });
  return temp;
}
