import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { region, industry, form, answers } = await req.json();

    const prompt = `You are an expert Canadian corporate lawyer. Generate a complete, highly-detailed, and legally sound '${form}' for a '${industry}' business operating in '${region}'. Incorporate these specific user details: ${JSON.stringify(answers)}. Format the entire document in clean Markdown so it looks like a professional legal contract.`;

    let documentText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });
      documentText = response.text || '';
    } catch (apiError: any) {
      if (apiError?.status === 429 || apiError?.message?.includes('429')) {
        console.warn('API Credits depleted. Using mock document for development.');
        documentText = `# ${form}\n\n**Prepared for:** ${industry} in ${region}\n\n> *Note: This is a mock document generated because your AI Studio API credits are currently depleted. Please top up your balance at https://ai.studio to generate real legal documents.*\n\n## 1. Introduction\nThis agreement is made between the parties as outlined in the user details.\n\n## 2. Terms and Conditions\nThe user agrees to comply with all ${region} provincial regulations for the ${industry} industry.\n\n## 3. Signatures\n\n_______________________\nDate:`;
      } else {
        throw apiError;
      }
    }

    return NextResponse.json({ document: documentText });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
