import os

def create_gallery():
    html = "<html><body style='display:flex; flex-wrap:wrap; font-family:sans-serif;'>"
    files = [f for f in os.listdir('.') if f.endswith('.jpeg') or f.endswith('.jpg') or f.endswith('.png')]
    for f in files:
        html += f"<div style='margin:10px; border:1px solid #ccc; padding:10px; text-align:center;'><img src='{f}' style='width:200px; height:200px; object-fit:cover;' /><br/><p>{f}</p></div>"
    html += "</body></html>"
    with open('gallery.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == "__main__":
    create_gallery()
