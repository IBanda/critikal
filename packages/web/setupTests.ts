// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/extend-expect';
import { server } from 'mocks/server';
import { loadEnvConfig } from '@next/env';

jest.mock('lib/textAnalytics', () => ({
  __esModule: true,
  default: jest.fn((message) => ({
    sentiment: 'negative',
    priority: 'high',
    sentences: [message],
    opnions: [{ text: 'service', opinion: 'dissappointed' }],
    keyPhrases: ['service', 'disappointed'],
  })),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
