#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const PUBLIC_LEGAL = path.join(ROOT, 'public', 'legal');
const OUT_FILE = path.join(ROOT, 'src', 'content', 'legal.json');
const TITLES_FILE = path.join(ROOT, 'src', 'content', 'legal-titles.json');
const CATEGORY_TITLES_FILE = path.join(ROOT, 'src', 'content', 'legal-category-titles.json');

/**
 * Expected directory layout under public/legal:
 * - Legislation/<Sector Name>/*.pdf
 * - Affidavits/EME Affidavits/*.pdf
 * - Affidavits/QSE Affidavits/*.pdf
 * - Affidavits/Specific Affidavits/*.(pdf|doc|docx|xls|xlsx)
 */

const SECTION_DIR_TO_NAME = {
  Legislation: 'Legislation',
  Affidavits: 'Affidavits',
};

const AFFIDAVIT_SUBFOLDERS = new Set(['EME Affidavits', 'QSE Affidavits', 'Specific Affidavits']);
const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx']);

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return [];
  }
}

function collectFiles(dir) {
  const files = [];
  for (const entry of readDirSafe(dir)) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.has(ext)) {
        files.push(entry.name);
      }
    }
  }
  return files;
}

function buildManifest() {
  const categories = [];
  let titleOverrides = {};
  let categoryTitleOverrides = {};
  try {
    if (fs.existsSync(TITLES_FILE)) {
      titleOverrides = JSON.parse(fs.readFileSync(TITLES_FILE, 'utf-8')) || {};
    }
    if (fs.existsSync(CATEGORY_TITLES_FILE)) {
      categoryTitleOverrides = JSON.parse(fs.readFileSync(CATEGORY_TITLES_FILE, 'utf-8')) || {};
    }
  } catch {}

  for (const sectionEntry of readDirSafe(PUBLIC_LEGAL)) {
    if (!sectionEntry.isDirectory()) continue;
    const sectionName = SECTION_DIR_TO_NAME[sectionEntry.name];
    if (!sectionName) continue;

    const sectionDir = path.join(PUBLIC_LEGAL, sectionEntry.name);

    if (sectionName === 'Legislation') {
      for (const sectorEntry of readDirSafe(sectionDir)) {
        if (!sectorEntry.isDirectory()) continue;
        const sectorDir = path.join(sectionDir, sectorEntry.name);
        const files = collectFiles(sectorDir);
        const documents = files.map((filename) => {
          const abs = path.join(sectorDir, filename);
          const stat = fs.statSync(abs);
          const url = `/legal/${sectionEntry.name}/${sectorEntry.name}/${filename}`;
          const relKey = `legal/${sectionEntry.name}/${sectorEntry.name}/${filename}`;
          return {
            title: titleOverrides[relKey] || path.parse(filename).name,
            url,
            ext: path.extname(filename).slice(1).toLowerCase(),
            bytes: stat.size,
            mtime: stat.mtime.toISOString(),
          };
        });
        categories.push({
          section: 'Legislation',
          name: sectorEntry.name,
          displayName: categoryTitleOverrides[`Legislation/${sectorEntry.name}`],
          key: toSlug(sectorEntry.name),
          documents,
        });
      }
    }

    if (sectionName === 'Affidavits') {
      for (const subEntry of readDirSafe(sectionDir)) {
        if (!subEntry.isDirectory()) continue;
        if (!AFFIDAVIT_SUBFOLDERS.has(subEntry.name)) continue;
        const subDir = path.join(sectionDir, subEntry.name);
        const files = collectFiles(subDir);
        const documents = files.map((filename) => {
          const abs = path.join(subDir, filename);
          const stat = fs.statSync(abs);
          const url = `/legal/${sectionEntry.name}/${subEntry.name}/${filename}`;
          const relKey = `legal/${sectionEntry.name}/${subEntry.name}/${filename}`;
          return {
            title: titleOverrides[relKey] || path.parse(filename).name,
            url,
            ext: path.extname(filename).slice(1).toLowerCase(),
            bytes: stat.size,
            mtime: stat.mtime.toISOString(),
          };
        });
        categories.push({
          section: 'Affidavits',
          name: subEntry.name,
          displayName: categoryTitleOverrides[`Affidavits/${subEntry.name}`],
          key: toSlug(subEntry.name),
          documents,
        });
      }
    }
  }

  const manifest = {
    updatedAt: new Date().toISOString(),
    categories: categories.sort((a, b) => a.section.localeCompare(b.section) || a.name.localeCompare(b.name)),
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));
  return manifest;
}

const manifest = buildManifest();
console.log(`Generated legal manifest with ${manifest.categories.length} categories at: ${path.relative(ROOT, OUT_FILE)}`);


