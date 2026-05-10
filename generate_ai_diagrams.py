import os
import csv
import json
import re
from openai import OpenAI
from tqdm import tqdm

# Configuration
API_KEY = "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"
CSV_FILE = 'AI Glossary - Dataset.xlsx - English - Arabic.csv'
BASE_DIR = 'glossary_terms'
BATCH_SIZE = 50  # Start with a batch of 50 to show it works

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = API_KEY
)

def clean_filename(name):
    return re.sub(r'[^a-zA-Z0-9]', '_', name.strip())

def get_ai_mermaid(en_term, ar_term, ar_def):
    prompt = f"""
Generate a professional Mermaid.js UML flowchart (graph TD) that explains the following AI concept in detail. 
Use Arabic for the node labels. The diagram should show the actual process, logic, or workflow of the concept.
Concept: {en_term} ({ar_term})
Definition: {ar_def}

Return ONLY the mermaid code block (no markdown markers like ```mermaid). 
Ensure the labels are in double quotes to avoid syntax errors.
Example structure:
graph TD
A["البداية"] --> B["عملية محددة"]
"""
    try:
        completion = client.chat.completions.create(
            model="qwen/qwen3-coder-480b-a35b-instruct",
            messages=[{"role":"user","content":prompt}],
            temperature=0.2,
            top_p=0.7,
            max_tokens=1024
        )
        content = completion.choices[0].message.content.strip()
        # Remove markdown markers if the model included them
        content = content.replace("```mermaid", "").replace("```", "").strip()
        return content
    except Exception as e:
        print(f"Error generating diagram for {en_term}: {e}")
        return None

def main():
    terms = []
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        terms = list(reader)

    print(f"Processing first {BATCH_SIZE} terms using AI...")
    
    for i in tqdm(range(min(BATCH_SIZE, len(terms)))):
        row = terms[i]
        en_term = row.get('English Term', '').strip()
        ar_term = row.get('Arabic Term', '').strip()
        ar_def = row.get('Arabic Def.', '').strip()
        
        if not ar_term: continue
        
        folder_name = clean_filename(en_term)
        term_dir = os.path.join(BASE_DIR, folder_name)
        if not os.path.exists(term_dir):
            os.makedirs(term_dir)

        # Only generate if we don't have a specific custom D3 visual already
        # (We skip the first ones we hand-coded like A/B Testing if they don't have mermaid in them)
        vis_path = os.path.join(term_dir, 'visual.js')
        already_custom = False
        if os.path.exists(vis_path):
            with open(vis_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'd3.select' in content and 'window.mermaid' not in content:
                    already_custom = True
        
        if already_custom:
            continue

        mermaid_code = get_ai_mermaid(en_term, ar_term, ar_def)
        
        if mermaid_code:
            # Update data.json
            data_path = os.path.join(term_dir, 'data.json')
            term_data = {}
            if os.path.exists(data_path):
                with open(data_path, 'r', encoding='utf-8') as f:
                    term_data = json.load(f)
            
            term_data['ai_mermaid'] = mermaid_code
            with open(data_path, 'w', encoding='utf-8') as f:
                json.dump(term_data, f, ensure_ascii=False, indent=4)
                
            # Update visual.js
            js_code = f"""
function renderVisual(container, termData) {{
    const mermaidCode = `{mermaid_code}`;
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
${{mermaidCode}}
        </div>
    `;
    setTimeout(() => {{
        if (window.mermaid) {{ 
            try {{ window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); }} 
            catch (e) {{ console.error("Mermaid Error:", e); }}
        }}
    }}, 50);
}}
"""
            with open(vis_path, 'w', encoding='utf-8') as f:
                f.write(js_code)

if __name__ == "__main__":
    main()
