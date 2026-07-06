import os
import struct

def get_image_size(fname):
    with open(fname, 'rb') as f:
        head = f.read(24)
        if len(head) != 24: return None
        if head.startswith(b'\x89PNG\r\n\x1a\n'):
            check = struct.unpack('>i', head[4:8])[0]
            if check != 0x0d0a1a0a: return None
            width, height = struct.unpack('>ii', head[16:24])
            return width, height
        elif head.startswith(b'\xff\xd8'):
            f.seek(0)
            size = 2
            ftype = 0
            while not 0xc0 <= ftype <= 0xcf or ftype in [0xc4, 0xc8, 0xcc]:
                f.seek(size, 1)
                byte = f.read(1)
                while ord(byte) == 0xff:
                    byte = f.read(1)
                ftype = ord(byte)
                size = struct.unpack('>H', f.read(2))[0] - 2
            f.seek(1, 1)
            height, width = struct.unpack('>HH', f.read(4))
            return width, height
    return None

for f in os.listdir('.'):
    if f.endswith('.jpeg') or f.endswith('.jpg'):
        try:
            size = get_image_size(f)
            if size and size[1] > size[0]: # portrait
                ratio = size[1] / size[0]
                print(f'{f}: {size[0]}x{size[1]} (ratio {ratio:.2f})')
        except Exception as e:
            pass
