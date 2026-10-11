export interface CodeAnalysisResult {
  overall_similarity: number;
  lexical_similarity: number;
  structural_similarity: number;
  boilerplate_filtered_similarity: number;
  observations: string[];
  explanation: string;
  commonAlgorithm: string | null;
  lineEvidence: LineEvidence[];
}

export interface LineEvidence {
  firstLine: number;
  secondLine: number;
  excerpt: string;
}

function tokenize(code: string): string[] {
  return code
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
    .replace(/#.*/g, '')
    .match(/[a-zA-Z_]\w*|\d+|[^\w\s]/g) || [];
}

function extractControlFlowPatterns(code: string): string[] {
  const patterns: string[] = [];
  for (const line of code.split('\n')) {
    const trimmed = line.trim();
    if (/^(for|while)\b/.test(trimmed)) patterns.push('LOOP');
    else if (/^(if|elif|else if)\b/.test(trimmed)) patterns.push('BRANCH');
    else if (/^return\b/.test(trimmed)) patterns.push('RETURN');
    else if (/^[\w.[\]]+\s*[+\-*/]?=(?!=)/.test(trimmed)) patterns.push('ASSIGNMENT');
  }
  return patterns;
}

function ngrams(tokens: string[], size: number): string[] {
  const result: string[] = [];
  for (let index = 0; index <= tokens.length - size; index++) {
    result.push(tokens.slice(index, index + size).join(' '));
  }
  return result;
}

function jaccard(first: string[], second: string[]): number {
  const a = new Set(first);
  const b = new Set(second);
  if (!a.size && !b.size) return 1;
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

function multisetSimilarity(first: string[], second: string[]): number {
  if (!first.length && !second.length) return 1;
  if (!first.length || !second.length) return 0;
  const counts = (items: string[]) => items.reduce((map, item) => map.set(item, (map.get(item) ?? 0) + 1), new Map<string, number>());
  const a = counts(first);
  const b = counts(second);
  const keys = new Set([...a.keys(), ...b.keys()]);
  let overlap = 0;
  let total = 0;
  for (const key of keys) {
    const firstCount = a.get(key) ?? 0;
    const secondCount = b.get(key) ?? 0;
    overlap += Math.min(firstCount, secondCount);
    total += Math.max(firstCount, secondCount);
  }
  return total ? overlap / total : 0;
}

function findExactLineEvidence(first: string, second: string[]): LineEvidence[] {
  const lineLocations = new Map<string, number[]>();
  second.forEach((line, index) => {
    const normalized = line.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!normalized || normalized.startsWith('#') || normalized.startsWith('//')) return;
    lineLocations.set(normalized, [...(lineLocations.get(normalized) ?? []), index + 1]);
  });

  const evidence: LineEvidence[] = [];
  const usedSecondLines = new Set<number>();
  first.split('\n').forEach((line, index) => {
    const normalized = line.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!normalized || normalized.startsWith('#') || normalized.startsWith('//')) return;
    const matchingLine = lineLocations.get(normalized)?.find(candidate => !usedSecondLines.has(candidate));
    if (matchingLine !== undefined) {
      usedSecondLines.add(matchingLine);
      evidence.push({ firstLine: index + 1, secondLine: matchingLine, excerpt: line.trim() });
    }
  });
  return evidence.slice(0, 12);
}

export function identifyCommonAlgorithm(code1: string, code2: string): string | null {
  const isBubbleSortPattern = (code: string) => {
    const normalized = code.toLowerCase();
    return /for\b[\s\S]{0,240}for\b/.test(normalized) &&
      /if\s+[^:\n]*\[[^\]]+\]\s*>\s*[^:\n]*\[[^\]]+\]/.test(normalized) &&
      /(?:,\s*[^,\n]+\s*=\s*[^,\n]+,\s*[^,\n]+|temp\s*=|swap)/.test(normalized);
  };
  return isBubbleSortPattern(code1) && isBubbleSortPattern(code2) ? 'Bubble sort' : null;
}

export function runLocalMultiLayerComparison(
  code1: string,
  code2: string,
  starterCode?: string,
): CodeAnalysisResult {
  const tokens1 = tokenize(code1);
  const tokens2 = tokenize(code2);
  const tokenNgrams1 = ngrams(tokens1, 3);
  const tokenNgrams2 = ngrams(tokens2, 3);
  const lexicalSimilarity = jaccard(tokenNgrams1, tokenNgrams2);
  const structuralSimilarity = multisetSimilarity(
    extractControlFlowPatterns(code1),
    extractControlFlowPatterns(code2),
  );
  const starterNgrams = starterCode?.trim() ? new Set(ngrams(tokenize(starterCode), 3)) : new Set<string>();
  const filteredNgrams1 = tokenNgrams1.filter(gram => !starterNgrams.has(gram));
  const filteredNgrams2 = tokenNgrams2.filter(gram => !starterNgrams.has(gram));
  const starterFilteredSimilarity = starterNgrams.size
    ? jaccard(filteredNgrams1, filteredNgrams2)
    : lexicalSimilarity;

  const overallSimilarity = (lexicalSimilarity * 0.6) + (structuralSimilarity * 0.4);
  const commonAlgorithm = identifyCommonAlgorithm(code1, code2);

  return {
    overall_similarity: overallSimilarity,
    lexical_similarity: lexicalSimilarity,
    structural_similarity: structuralSimilarity,
    boilerplate_filtered_similarity: starterFilteredSimilarity,
    observations: [
      'This is a local token and control-construct overlap estimate, not a parsed AST or a calibrated chance-of-coincidence score.',
      'Common algorithms, assignment constraints, starter code, and teaching materials can naturally produce similar implementations.',
      'This comparison cannot determine who authored code, whether collaboration was authorized, or whether AI was used.',
      ...(commonAlgorithm ? [`Both samples appear consistent with a common ${commonAlgorithm} pattern; this context is not proof that the solutions are independent.`] : []),
    ],
    explanation: 'The displayed percentages describe overlap in these two samples only. No validated independent-solution baseline is available to estimate whether the overlap is unusual.',
    commonAlgorithm,
    lineEvidence: findExactLineEvidence(code1, code2.split('\n')),
  };
}
