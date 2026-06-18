#!/usr/bin/env python3
"""
Generates projects.js from:
  - projects-meta.json  (titles, tags, descriptions — edit this manually)
  - portfolio/img/      (photos — add files here, script picks them up)

Run by GitHub Actions on every push. Also works locally:
  python scripts/generate_projects.py
"""

import os
import re
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, 'portfolio', 'img')
META_FILE = os.path.join(ROOT, 'projects-meta.json')
OUTPUT_FILE = os.path.join(ROOT, 'projects.js')

TRANSLIT = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
    'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
    'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
    'ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
}

def to_slug(text):
    text = text.lower().strip()
    result = ''
    for ch in text:
        if ch in TRANSLIT:
            result += TRANSLIT[ch]
        elif ch.isascii() and (ch.isalnum() or ch == '-'):
            result += ch
        elif ch in ' _':
            result += '-'
    return re.sub(r'-+', '-', result).strip('-') or 'project'

def sort_key(f):
    name = os.path.splitext(f)[0]
    m = re.match(r'0*(\d+)$', name)
    return int(m.group(1)) if m else f.lower()

def get_photos(folder_name):
    folder_path = os.path.join(IMG_DIR, folder_name)
    if not os.path.isdir(folder_path):
        return []
    files = [f for f in os.listdir(folder_path)
             if not f.startswith('.') and
             f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    files.sort(key=sort_key)
    return [f'portfolio/img/{folder_name}/{f}' for f in files]

def clean_title(name):
    t = name.strip().replace('_', '').replace('«', '').replace('»', '').replace('"', '')
    return re.sub(r'\s+', ' ', t).strip()

def js(val):
    return json.dumps(val, ensure_ascii=False)

def main():
    # Load meta
    if os.path.exists(META_FILE):
        with open(META_FILE, 'r', encoding='utf-8') as f:
            meta = json.load(f)
    else:
        meta = []

    folder_to_meta = {e['folder']: e for e in meta}
    existing_ids = {e['id'] for e in meta}

    # Scan portfolio/img/ for folders
    if os.path.isdir(IMG_DIR):
        folders_on_disk = sorted([
            f for f in os.listdir(IMG_DIR)
            if os.path.isdir(os.path.join(IMG_DIR, f)) and not f.startswith('.')
        ])
    else:
        folders_on_disk = []

    # Add new folders to meta
    new_added = False
    for folder in folders_on_disk:
        if folder not in folder_to_meta:
            title = clean_title(folder)
            slug = to_slug(folder)
            base_slug, n = slug, 2
            while slug in existing_ids:
                slug = f'{base_slug}-{n}'
                n += 1
            existing_ids.add(slug)
            entry = {
                'id': slug,
                'folder': folder,
                'ru': {'title': title, 'desc': ''},
                'en': {'title': title, 'desc': ''},
                'zh': {'title': title, 'desc': ''},
                'tags': ['одежда'],
                'tags_en': ['clothing'],
                'tags_zh': ['服装'],
                'year': '2024',
                'client': '',
                'services_ru': ['Лекала', 'Дизайн'],
                'services_en': ['Pattern Making', 'Design'],
                'services_zh': ['制版', '设计'],
            }
            meta.append(entry)
            folder_to_meta[folder] = entry
            new_added = True
            print(f'  [NEW] {slug}  ←  {folder}')

    # Build projects.js
    entries = []
    for entry in meta:
        folder = entry.get('folder', '')
        photos = get_photos(folder)
        photos_str = ',\n    '.join(js(p) for p in photos)

        block = f"""  {{
    id: {js(entry['id'])},
    ru: {{ title: {js(entry['ru']['title'])}, desc: {js(entry['ru'].get('desc',''))} }},
    en: {{ title: {js(entry['en']['title'])}, desc: {js(entry['en'].get('desc',''))} }},
    zh: {{ title: {js(entry['zh']['title'])}, desc: {js(entry['zh'].get('desc',''))} }},
    tags: {js(entry.get('tags',['одежда']))},
    tags_en: {js(entry.get('tags_en',['clothing']))},
    tags_zh: {js(entry.get('tags_zh',['服装']))},
    photos: [
    {photos_str}
    ],
    year: {js(entry.get('year','2024'))},
    client: {js(entry.get('client',''))},
    services_ru: {js(entry.get('services_ru',['Лекала','Дизайн']))},
    services_en: {js(entry.get('services_en',['Pattern Making','Design']))},
    services_zh: {js(entry.get('services_zh',['制版','设计']))},
  }}"""
        entries.append(block)

    output = 'const PROJECTS = [\n' + ',\n'.join(entries) + '\n];\n'
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(output)
    print(f'projects.js updated — {len(entries)} projects')

    if new_added:
        with open(META_FILE, 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
        print('projects-meta.json updated with new entries')

if __name__ == '__main__':
    main()
