import {
  TextAnalyticsClient,
  AnalyzeSentimentSuccessResult,
  ExtractKeyPhrasesSuccessResult,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';

const client = new TextAnalyticsClient(
  process.env.AZURE_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_KEY)
);
export interface Opinion {
  text: string;
  opinion: string;
}
interface SentmentResult {
  sentiment: string;
  priority: 'high' | 'normal';
  sentences: string[];
  opnions: Array<Opinion>;
}
async function analyze(text: string) {
  const sentiment = await client.analyzeSentiment(
    [{ text, language: 'en', id: '0' }],
    {
      includeOpinionMining: true,
    }
  );
  const result: SentmentResult = {
    sentiment: '',
    priority: 'normal',
    sentences: [],
    opnions: [],
  };
  sentiment.forEach((document: AnalyzeSentimentSuccessResult) => {
    const { negative } = document.confidenceScores;
    result.sentiment = document.sentiment;
    if (
      document.sentiment === 'negative' ||
      (document.sentiment === 'mixed' && negative >= 0.3)
    ) {
      result.priority = 'high';
    }
    document.sentences.forEach((sentence) => {
      if (sentence.sentiment === 'negative') {
        result.sentences.push(sentence.text);
      }
      sentence.minedOpinions.forEach(({ aspect, opinions }) => {
        let op: Opinion;
        opinions.forEach(({ text: opnionText }) => {
          op = {
            text: aspect.text,
            opinion: opnionText,
          };
        });
        result.opnions.push(op);
      });
    });
  });
  return result;
}

async function extractKeyPhrases(text: string) {
  const keyPhrases = await client.extractKeyPhrases([text]);
  const phrases: string[] = [];
  keyPhrases.forEach((document: ExtractKeyPhrasesSuccessResult) => {
    phrases.push(...document.keyPhrases);
  });
  return { keyPhrases: phrases };
}

export default async function analyzeText(text: string) {
  const analysisResult = await analyze(text);
  const keyPhrases = await extractKeyPhrases(text);
  return { ...analysisResult, ...keyPhrases };
}
