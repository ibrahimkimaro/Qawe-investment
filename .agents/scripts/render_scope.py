import fitz
from pathlib import Path
src = Path('attached_assets/mining_company_website_feature_scope_1788505821516.pdf')
out = Path('.agents/outputs/mining_scope_pages')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(src)
print('pages', doc.page_count)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    path = out / f'page-{i+1}.png'
    pix.save(path)
    print(path)
