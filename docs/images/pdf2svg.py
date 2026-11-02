"""Turns the one-page PDF Chrome printed of a picture into an SVG with its text as outlines, sized in CSS
pixels, for render.mjs: python pdf2svg.py PDF SVG WIDTH HEIGHT. Needs PyMuPDF (pip install pymupdf)."""

import re
import sys

import pymupdf

pdf, svg_path, width, height = sys.argv[1:5]
doc = pymupdf.open(pdf)
if len(doc) != 1:
    sys.exit(f"{pdf}: {len(doc)} pages, where a picture prints on one")
svg = doc[0].get_svg_image(text_as_path=True)
svg, sized = re.subn(r'width="[^"]*" height="[^"]*"', f'width="{width}" height="{height}"', svg, count=1)
if sized != 1:
    sys.exit(f"{pdf}: the SVG names no size on its root element")
with open(svg_path, "w", encoding="utf-8", newline="\n") as out:
    out.write(svg)
