import json
from datasketch import MinHash
import re

def tokenize(source_code: str):
    """Baseline lexical tokenization."""
    # Simple regex tokenizer for baseline
    tokens = re.findall(r'[a-zA-Z_]\w*|\d+|[^\w\s]', source_code)
    return tokens

def jaccard_similarity(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    if not set1 or not set2:
        return 0.0
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return float(intersection) / union

def get_baseline_similarity(code1: str, code2: str) -> float:
    t1 = tokenize(code1)
    t2 = tokenize(code2)
    
    # Use 3-grams
    n = 3
    ngrams1 = ["".join(t1[i:i+n]) for i in range(len(t1)-n+1)]
    ngrams2 = ["".join(t2[i:i+n]) for i in range(len(t2)-n+1)]
    
    return jaccard_similarity(ngrams1, ngrams2)

# Fallback python AST for structural similarity
import ast

def _alpha_convert_ast(node, scope_map, counter):
    tokens = []
    
    node_name = type(node).__name__
    
    # Handle variable names
    if isinstance(node, ast.Name):
        if node.id not in scope_map:
            scope_map[node.id] = f"var_{counter[0]}"
            counter[0] += 1
        tokens.append(scope_map[node.id])
    elif isinstance(node, ast.arg):
        if node.arg not in scope_map:
            scope_map[node.arg] = f"var_{counter[0]}"
            counter[0] += 1
        tokens.append(scope_map[node.arg])
    elif isinstance(node, ast.FunctionDef):
        tokens.append("FunctionDef")
    else:
        tokens.append(node_name)
        
    for child in ast.iter_child_nodes(node):
        tokens.extend(_alpha_convert_ast(child, scope_map, counter))
        
    return tokens

def get_structural_similarity(code1: str, code2: str) -> float:
    try:
        tree1 = ast.parse(code1)
        tree2 = ast.parse(code2)
    except SyntaxError:
        # Fallback if invalid python code
        return get_baseline_similarity(code1, code2)
        
    tokens1 = _alpha_convert_ast(tree1, {}, [1])
    tokens2 = _alpha_convert_ast(tree2, {}, [1])
    
    n = 3
    ngrams1 = ["".join(tokens1[i:i+n]) for i in range(len(tokens1)-n+1)]
    ngrams2 = ["".join(tokens2[i:i+n]) for i in range(len(tokens2)-n+1)]
    
    return jaccard_similarity(ngrams1, ngrams2)

def compare_submissions(code1: str, code2: str):
    baseline = get_baseline_similarity(code1, code2)
    structural = get_structural_similarity(code1, code2)
    
    # Overall score leans heavily on structural
    overall = (baseline * 0.3) + (structural * 0.7)
    
    evidence = {
        "baseline_score": baseline,
        "structural_score": structural,
        "explanation": "Structural similarity detected via AST canonicalization and alpha-conversion of identifiers." if structural > 0.7 else "No significant structural similarity detected."
    }
    
    return {
        "overall_similarity": overall,
        "baseline_similarity": baseline,
        "structural_similarity": structural,
        "evidence_json": json.dumps(evidence)
    }
