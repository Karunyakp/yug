cd d:\technova\yug\backend
if (-not (Test-Path "venv")) {
    py -m venv venv
}
& .\venv\Scripts\python.exe -m pip install -r requirements.txt
& .\venv\Scripts\python.exe -m pip install tree-sitter-python networkx datasketch
& .\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
