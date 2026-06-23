import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { region, industry, form, answers } = await req.json();

    const prompt = `You are an expert Canadian corporate lawyer. Generate a complete, highly-detailed, and legally sound '${form}' for a '${industry}' business operating in '${region}'. Incorporate these specific user details: ${JSON.stringify(answers)}. Format the entire document in clean Markdown so it looks like a professional legal contract.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro',
      contents: prompt,
    });

    return NextResponse.json({ document: response.text });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
