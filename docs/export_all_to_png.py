import os
import glob
import subprocess
from concurrent.futures import ThreadPoolExecutor

DOCS_DIR = r"D:\Kuliah\IPPL\docs"
DIAGRAMS_DIR = os.path.join(DOCS_DIR, "diagrams")
EXPORT_DIR = os.path.join(DIAGRAMS_DIR, "export_images")
os.makedirs(EXPORT_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
env = os.environ.copy()
env["PUPPETEER_EXECUTABLE_PATH"] = CHROME_PATH

tasks = []

# 1. Use Case
uc_file = os.path.join(DIAGRAMS_DIR, "usecase", "usecase_diagram_final.drawio")
if os.path.exists(uc_file):
    tasks.append((uc_file, os.path.join(EXPORT_DIR, "usecase_diagram.png")))

# 2. DFD Level 0, 1, 2
for name, out in [("dfd_level_0.drawio", "dfd_level_0.png"),
                  ("dfd_level_1.drawio", "dfd_level_1.png"),
                  ("dfd_level_2.drawio", "dfd_level_2.png")]:
    dfd_f = os.path.join(DIAGRAMS_DIR, "dfd", name)
    if os.path.exists(dfd_f):
        tasks.append((dfd_f, os.path.join(EXPORT_DIR, out)))

# 3. Activity Diagrams (AD-01 to AD-24)
ad_files = glob.glob(os.path.join(DIAGRAMS_DIR, "activity", "AD-*.drawio"))
for ad in ad_files:
    base = os.path.basename(ad).replace(".drawio", ".png")
    tasks.append((ad, os.path.join(EXPORT_DIR, base)))

# 4. Sequence Diagrams (SD-01 to SD-24)
sd_files = glob.glob(os.path.join(DIAGRAMS_DIR, "sequence", "SD-*.drawio"))
for sd in sd_files:
    base = os.path.basename(sd).replace(".drawio", ".png")
    tasks.append((sd, os.path.join(EXPORT_DIR, base)))

print(f"Total diagram files to export: {len(tasks)}")

def export_one(task):
    in_file, out_file = task
    if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
        return f"Already exists: {os.path.basename(out_file)}"
    cmd = f'npx --yes draw.io-export "{in_file}" -o "{out_file}"'
    res = subprocess.run(cmd, env=env, capture_output=True, text=True, shell=True)
    if res.returncode == 0 and os.path.exists(out_file):
        return f"OK: {os.path.basename(out_file)}"
    else:
        return f"FAIL: {os.path.basename(out_file)} -> {res.stderr}"

with ThreadPoolExecutor(max_workers=6) as executor:
    results = list(executor.map(export_one, tasks))

for r in results:
    print(r)

print("Batch export completed!")
