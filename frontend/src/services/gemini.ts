import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.GEMINI_API_KEY || '';

export interface AnalysisOutput {
  explanation: string;
  ai_analysis: string[];
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

export async function generateVivaQuestionsWithGemini(code: string): Promise<string[]> {
  if (!code.trim()) {
    throw new Error('Enter code before generating explanation questions.');
  }

  const response = await createClient().interactions.create({
    model: 'gemini-3.8-flash',
    input: `Generate exactly 4 open-ended questions that help a student explain the code below and demonstrate understanding. Ground every question in a specific visible construct or behavior in the code. Ask neutral questions about choices, edge cases, complexity, or how a small change affects behavior. Do not infer copying, AI authorship, intent, or misconduct. Return only a valid JSON array of four strings.\n\nCode:\n\`\`\`\n${code.slice(0, 16000)}\n\`\`\``,
  });
  if (!response.output_text?.trim()) {
    throw new Error('Gemini returned no questions.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(response.output_text.replace(/```json/gi, '').replace(/```/g, '').trim());
  } catch {
    throw new Error('Gemini returned questions in an unreadable format. Please try again.');
  }
  if (!Array.isArray(parsed) || parsed.length < 3 || parsed.length > 5 ||
      !parsed.every(question => typeof question === 'string' && question.trim())) {
    throw new Error('Gemini did not return 3–5 valid explanation questions. Please try again.');
  }
  return parsed.map(question => question.trim());
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
  if (typeof data.explanation !== 'string' || !Array.isArray(data.ai_analysis) ||
      !data.ai_analysis.every(item => typeof item === 'string' && item.trim())) {
    throw new Error('Gemini returned an incomplete analysis response.');
  }

  return {
    explanation: data.explanation,
    ai_analysis: data.ai_analysis,
    source: 'gemini',
  };
}

export async function analyzeCodeWithGemini(
  code1: string,
  code2: string,
  starterCode?: string,
): Promise<AnalysisOutput> {
  const prompt = `You are CodeGuard AI, a code-reading assistant for an academic demo.
Describe only concrete, observable similarities or differences in the submitted snippets. Common algorithms and assignment requirements can independently produce similar code. Do not infer copying, AI authorship, intent, or misconduct. Do not produce similarity or probability scores, risk labels, or claims about AST analysis. Keep the observations neutral and explicitly state that human review and student context are needed.

Submission 1:
\`\`\`
${code1}
\`\`\`

Submission 2:
\`\`\`
${code2}
\`\`\`
${starterCode ? `\nInstructor starter code to exclude:\n\`\`\`\n${starterCode}\n\`\`\`` : ''}

Return only one valid raw JSON object matching this shape:
{
  "explanation": "<brief, neutral contextual explanation>",
  "ai_analysis": ["<specific, observable comparison detail>"]
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
