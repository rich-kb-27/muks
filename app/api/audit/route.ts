import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { appName, sector, purpose, dataType } = await request.json();

    if (!appName || !purpose) {
      return NextResponse.json({ error: 'Application name and purpose are required' }, { status: 400 });
    }

    const prompt = `
      You are an expert AI Ethics Auditor using the Mukuka Chilufya AIEADSS framework, incorporating UNESCO and NIST AI Risk Management principles for Education and Mass Communication.
      
      Analyze the following AI application:
      - Name: "${appName}"
      - Sector: "${sector}"
      - Purpose: "${purpose}"
      - Data Type: "${dataType}"

      Evaluate it across 7 ethical dimensions: privacy, fairness, transparency, oversight, integrity, safety, and inclusiveness.

      You must output a valid JSON object ONLY (no markdown formatting blocks around it like \`\`\`json), using this exact structure:
      {
        "riskScore": number between 5 and 95,
        "riskLevel": "Low" or "Moderate" or "High",
        "criteria": {
          "privacy": { "score": number 1-5, "weight": 1.5, "notes": "string evaluation" },
          "fairness": { "score": number 1-5, "weight": 2.0, "notes": "string evaluation" },
          "transparency": { "score": number 1-5, "weight": 1.0, "notes": "string evaluation" },
          "oversight": { "score": number 1-5, "weight": 1.5, "notes": "string evaluation" },
          "integrity": { "score": number 1-5, "weight": 1.2, "notes": "string evaluation" },
          "safety": { "score": number 1-5, "weight": 1.0, "notes": "string evaluation" },
          "inclusiveness": { "score": number 1-5, "weight": 1.0, "notes": "string evaluation" }
        },
        "recommendations": [
          "Specific mitigation recommendation 1",
          "Specific mitigation recommendation 2",
          "Specific mitigation recommendation 3"
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    const rawText = response.text ? response.text.trim() : '';
    const cleanedJson = rawText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    const auditResult = JSON.parse(cleanedJson);

    return NextResponse.json(auditResult);
  } catch (error) {
    console.error('AI Audit Error:', error);
    return NextResponse.json({ error: 'Failed to generate AI ethical audit' }, { status: 500 });
  }
}