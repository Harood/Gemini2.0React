import { GoogleGenAI } from '@google/genai';

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

  const model = 'gemini-2.0-flash-lite';

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = '';

  for await (const chunk of response) {
    // process.stdout.write(chunk.text); // optional: only works in Node.js
    fullText += chunk.text;
  }

  return fullText; // ✅ Now returns the full string
}

export default main;
