import { GoogleGenAI } from '@google/genai';

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY_MS = 1200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error) {
  const rawMessage = error?.message || '';
  return (
    rawMessage.includes('429') ||
    rawMessage.includes('RESOURCE_EXHAUSTED') ||
    rawMessage.toLowerCase().includes('too many requests')
  );
}

function getFriendlyApiError(error) {
  const rawMessage = error?.message || '';

  if (isRateLimitError(error)) {
    return 'Rate limit reached (429). Please wait a moment and try again.';
  }

  if (
    rawMessage.includes('API_KEY_INVALID') ||
    rawMessage.toLowerCase().includes('api key expired')
  ) {
    return 'Your Gemini API key is invalid or expired. Generate a new key and update VITE_GEMINI_API_KEY in your .env file.';
  }

  if (rawMessage.includes('PERMISSION_DENIED')) {
    return 'Access denied by Gemini API. Check that the key is enabled and allowed for Generative Language API.';
  }

  return 'Failed to contact Gemini API. Please try again.';
}

async function main(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY in environment variables.');
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-3-flash-preview';

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  let response;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });
      break;
    } catch (error) {
      const shouldRetry = isRateLimitError(error) && attempt < MAX_RETRIES;

      if (!shouldRetry) {
        throw new Error(getFriendlyApiError(error));
      }

      const backoffMs = BASE_RETRY_DELAY_MS * Math.pow(2, attempt);
      await sleep(backoffMs);
    }
  }

  let fullText = '';

  for await (const chunk of response) {
    // process.stdout.write(chunk.text); // optional: only works in Node.js
    fullText += chunk.text;
  }

  return fullText; // ✅ Now returns the full string
}

export default main;
