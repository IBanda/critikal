import {
  TextAnalyticsClient,
  AnalyzeSentimentSuccessResult,
  ExtractKeyPhrasesSuccessResult,
  DetectLanguageSuccessResult,
  DetectLanguageResultArray,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';
import { v4 as uuidv4 } from 'uuid';

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

async function detectLanguage(text: string) {
  const languages: DetectLanguageResultArray = await client.detectLanguage([
    text,
  ]);
  const language = languages[0] as DetectLanguageSuccessResult;
  return language.primaryLanguage.iso6391Name;
}

async function translate(text: string) {
  const res = await fetch(
    'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=zh-Hans',
    {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': 'global',
        'Content-type': 'application/json; charset=UTF-8',
        'X-ClientTraceId': uuidv4().toString(),
      },
      body: JSON.stringify([
        {
          text,
        },
      ]),
    }
  );
  const data = await res.json();
  return data;
}

export default async function analyzeText(text: string) {
  const language = await detectLanguage(text);
  if (language !== 'en') {
    await translate(text);
  }
  const analysisResult = await analyze(text);
  const keyPhrases = await extractKeyPhrases(text);
  return { ...analysisResult, ...keyPhrases };
}
