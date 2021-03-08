import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from '@azure/ai-text-analytics';

const client = new TextAnalyticsClient(
  process.env.AZURE_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_KEY)
);

async function analyze(text: string) {
  console.log(`
    *************************************************************
    Sentiment 
    *************************************************************
    `);
  const sentiment = await client.analyzeSentiment([text]);
  sentiment.forEach((document) => console.log(document));
}

async function extractKeyPhrases(text: string) {
  console.log(`
    *************************************************************
    Key Phrases
    *************************************************************
    `);
  const keyPhrases = await client.extractKeyPhrases([text]);
  keyPhrases.forEach((document) => console.log(document));
}

async function detectLanguage(text: string) {
  console.log(`
    *************************************************************
    Language
    *************************************************************
    `);
  const language = await client.detectLanguage([text]);
  language.forEach((document) => console.log(document));
}

export default async function analyzeText(text: string) {
  await analyze(text);
  await extractKeyPhrases(text);
  await detectLanguage(text);
}
