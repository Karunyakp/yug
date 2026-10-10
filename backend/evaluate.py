import engine

# Mock dataset for MVP evaluation
# In reality, this would be loaded from a labeled dataset of 1,000 files

dataset = [
    {
        "type": "Identical",
        "code1": "def add(a, b):\n    return a + b",
        "code2": "def add(a, b):\n    return a + b",
        "is_plagiarized": True
    },
    {
        "type": "Variable Renaming",
        "code1": "def calc_sum(x, y):\n    res = x + y\n    return res",
        "code2": "def add_nums(a, b):\n    total = a + b\n    return total",
        "is_plagiarized": True
    },
    {
        "type": "Unrelated",
        "code1": "def print_hello():\n    print('Hello World')",
        "code2": "def add(a, b):\n    return a + b",
        "is_plagiarized": False
    }
]

def run_evaluation(threshold=0.6):
    true_positives = 0
    false_positives = 0
    true_negatives = 0
    false_negatives = 0

    print("Running Evaluation...\n")
    
    for item in dataset:
        result = engine.compare_submissions(item["code1"], item["code2"])
        score = result["overall_similarity"]
        
        predicted_plagiarism = score >= threshold
        
        if predicted_plagiarism and item["is_plagiarized"]:
            true_positives += 1
        elif predicted_plagiarism and not item["is_plagiarized"]:
            false_positives += 1
        elif not predicted_plagiarism and not item["is_plagiarized"]:
            true_negatives += 1
        elif not predicted_plagiarism and item["is_plagiarized"]:
            false_negatives += 1
            
        print(f"[{item['type']}] Score: {score:.2f} | Predicted: {predicted_plagiarism} | Actual: {item['is_plagiarized']}")

    precision = true_positives / (true_positives + false_positives) if (true_positives + false_positives) > 0 else 0
    recall = true_positives / (true_positives + false_negatives) if (true_positives + false_negatives) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    
    print("\n--- Evaluation Metrics ---")
    print(f"Precision: {precision:.2f}")
    print(f"Recall:    {recall:.2f}")
    print(f"F1-Score:  {f1:.2f}")
    
if __name__ == "__main__":
    run_evaluation()
