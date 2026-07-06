import os
from PIL import Image

def get_avg_color(img):
    img = img.resize((50, 50))
    pixels = list(img.getdata())
    r = sum([p[0] for p in pixels]) // len(pixels)
    g = sum([p[1] for p in pixels]) // len(pixels)
    b = sum([p[2] for p in pixels]) // len(pixels)
    return r, g, b

for f in os.listdir('.'):
    if f.endswith('.jpeg') or f.endswith('.jpg'):
        try:
            with Image.open(f) as img:
                w, h = img.size
                if h > w: # portrait
                    img = img.convert('RGB')
                    r, g, b = get_avg_color(img)
                    print(f'{f}: {w}x{h}, Avg Color: ({r:3}, {g:3}, {b:3})')
        except Exception as e:
            pass
