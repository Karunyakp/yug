import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.GEMINI_API_KEY || '';

export interface AnalysisOutput {
  overall_similarity: number;
  baseline_similarity: number;
  structural_similarity: number;
  cross_language_similarity?: number;
  explanation: string;
  ai_analysis: string[];
  ai_patterns?: {
    observed_characteristics: string[];
    style_consistency_score?: number;
    limitations: string;
    viva_questions: string[];
  };
  source: 'gemini' | 'local-fallback';
  fallbackReason?: string;
}

export interface AssistantTurn {
  role: 'user' | 'assistant';
  text: string;
}

function createClient(): GoogleGenAI {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Set GEMINI_API_KEY in the frontend environment and rebuild.');
  }
  return new GoogleGenAI({ apiKey: API_KEY });
}

export async function askCodeGuardAssistant(history: AssistantTurn[]): Promise<string> {
  const conversation = history
    .slice(-12)
    .map(turn => `${turn.role === 'user' ? 'User' : 'Assistant'}: ${turn.text}`)
    .join('\n\n');
  const response = await createClient().interactions.create({
    model: 'gemini-3.8-flash',
    input: `You are the CodeGuard AI help assistant. Answer questions about using this frontend demo and general code review concepts. Be clear that similarity indicators are not proof of misconduct and that a human instructor must make decisions. Do not claim that you can see the user's account, files, or app data unless they include it in this chat. Do not request passwords, API keys, or sensitive student information. Keep answers concise and practical.\n\nConversation:\n${conversation}`,
  });
  if (!response.output_text?.trim()) {
    throw new Error('Gemini returned an empty assistant response.');
  }
  return response.output_text.trim();
}

function parseAnalysis(text: string): AnalysisOutput {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed: unknown = JSON.parse(cleaned);
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Gemini returned an invalid analysis response.');
  }

  const data = parsed as Record<string, unknown>;
  const requiredNumbers = ['overall_similarity', 'baseline_similarity', 'structural_similarity'];
  for (const field of requiredNumbers) {
    if (typeof data[field] !== 'number' || !Number.isFinite(data[field])) {
      throw new Error(`Gemini response is missing a valid ${field} value.`);
    }
  }
  if (typeof data.explanation !== 'string' || !Array.isArray(data.ai_analysis) ||
      !data.ai_analysis.every(item => typeof item === 'string')) {
    throw new Error('Gemini returned an incomplete analysis response.');
  }

  return {
    overall_similarity: data.overall_similarity as number,
    baseline_similarity: data.baseline_similarity as number,
    structural_similarity: data.structural_similarity as number,
    cross_language_similarity: typeof data.cross_language_similarity === 'number'
      ? data.cross_language_similarity
      : 0,
    explanation: data.explanation,
    ai_analysis: data.ai_analysis,
    ai_patterns: typeof data.ai_patterns === 'object' && data.ai_patterns !== null
      ? data.ai_patterns as AnalysisOutput['ai_patterns']
      : undefined,
    source: 'gemini',
  };
}

export async function analyzeCodeWithGemini(
  code1: string,
  code2: string,
  starterCode?: string,
): Promise<AnalysisOutput> {
  const prompt = `You are CodeGuard AI, an expert code integrity analyst for academic computer science departments.
Compare the two code submissions for structural similarity, code duplication, cross-language algorithmic translation, and possible obfuscation such as renamed variables or refactored loops. Treat observations as indicators for human review, never as proof of misconduct or AI authorship.

Submission 1:
\`\`\`
${code1}
\`\`\`

Submission 2:
\`\`\`
${code2}
\`\`\`
${starterCode ? `\nInstructor starter code to exclude:\n\`\`\`\n${starterCode}\n\`\`\`` : ''}

Respond only with one valid raw JSON object matching this shape:
{
  "overall_similarity": <number from 0 to 1>,
  "baseline_similarity": <number from 0 to 1>,
  "structural_similarity": <number from 0 to 1>,
  "cross_language_similarity": <number from 0 to 1>,
  "explanation": "<brief contextual finding>",
  "ai_analysis": ["<specific code observation>"],
  "ai_patterns": {
    "observed_characteristics": ["<observable style characteristic, if any>"],
    "style_consistency_score": <number from 0 to 100>,
    "limitations": "<state that indicators are not proof of authorship>",
    "viva_questions": ["<question grounded in the submitted code>"]
  }
}`;

  const response = await createClient().interactions.create({
    model: 'gemini-3.8-flash',
    input: prompt,
  });
  if (!response.output_text) {
    throw new Error('Gemini returned an empty analysis response.');
  }
  return parseAnalysis(response.output_text);
}

export async function generateConfrontationEmailWithGemini(
  studentName: string,
  assignmentName: string,
  similarityScore: number,
  findings: string[],
): Promise<string> {
  const prompt = `Draft a polite, non-accusatory academic integrity review meeting request from an instructor to ${studentName} about their "${assignmentName}" submission. The local similarity measurement is ${similarityScore}%. Make clear it is a preliminary review finding, not a final conclusion. Findings:\n${findings.map(finding => `- ${finding}`).join('\n')}`;
  const response = await createClient().interactions.create({
    model: 'gemini-3.8-flash',
    input: prompt,
  });
  if (!response.output_text) {
    throw new Error('Gemini returned an empty email draft.');
  }
  return response.output_text;
}
