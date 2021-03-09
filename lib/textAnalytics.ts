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
interface SentmentResult {
  sentiment: string;
  priority: 'high' | 'normal';
}
async function analyze(text: string) {
  const sentiment = await client.analyzeSentiment([text]);
  const result: SentmentResult = { sentiment: '', priority: 'normal' };
  sentiment.forEach((document: AnalyzeSentimentSuccessResult) => {
    const { negative } = document.confidenceScores;
    result.sentiment = document.sentiment;
    if (
      document.sentiment === 'negative' ||
      (document.sentiment === 'mixed' && negative >= 0.3)
    ) {
      result.priority = 'high';
    }
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

// async function detectLanguage(text: string) {
//   const language = await client.detectLanguage([text]);
//   language.forEach((document) => console.log(document));
// }

export default async function analyzeText(text: string) {
  const analysisResult = await analyze(text);
  const keyPhrases = await extractKeyPhrases(text);
  return { ...analysisResult, ...keyPhrases };
}
