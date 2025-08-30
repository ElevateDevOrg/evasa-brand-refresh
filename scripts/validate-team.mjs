#!/usr/bin/env node
/**
 * Validate team data and assets.
 * - Ensures required fields
 * - Validates bio length (<= 320)
 * - Validates kebab-case id
 * - Ensures unique order values
 * - Checks photo assets exist in public/headshots (warns if missing; fails if filename provided but file missing)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TEAM_JSON = path.join(projectRoot, 'src', 'content', 'team.json');
const HEADSHOTS_DIR = path.join(projectRoot, 'public', 'headshots');

const isKebabCase = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);

const readJson = async (filePath) => {
  const raw = await fs.readFile(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${filePath}: ${e.message}`);
  }
};

const fileExists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  const errors = [];
  const warnings = [];

  const data = await readJson(TEAM_JSON);
  if (!Array.isArray(data)) {
    throw new Error('team.json must export an array');
  }

  const orders = new Map();

  for (const [index, m] of data.entries()) {
    const ctx = `team[${index}]`;

    // Required fields
    for (const field of ['id', 'name', 'role', 'bio', 'order']) {
      if (m[field] === undefined || m[field] === null || m[field] === '') {
        errors.push(`${ctx}: missing required field "${field}"`);
      }
    }

    // id kebab-case
    if (m.id && !isKebabCase(m.id)) {
      errors.push(`${ctx}: id "${m.id}" must be kebab-case (lowercase, hyphen-separated)`);
    }

    // order integer and uniqueness
    if (typeof m.order !== 'number' || !Number.isInteger(m.order)) {
      errors.push(`${ctx}: order must be an integer`);
    } else {
      if (orders.has(m.order)) {
        errors.push(`${ctx}: duplicate order value ${m.order} (also used by id "${orders.get(m.order)}")`);
      } else {
        orders.set(m.order, m.id ?? ctx);
      }
    }

    // bio length
    if (typeof m.bio === 'string' && m.bio.length > 320) {
      errors.push(`${ctx}: bio exceeds 320 characters (${m.bio.length})`);
    }

    // photo checks
    if (m.photo && typeof m.photo === 'string') {
      const filename = m.photo.trim();
      const isWebp = filename.toLowerCase().endsWith('.webp');
      const candidatePaths = [
        path.join(HEADSHOTS_DIR, filename),
        // If not webp, also check for computed .webp as primary
        !isWebp ? path.join(HEADSHOTS_DIR, filename.replace(/\.[a-zA-Z0-9]+$/, '.webp')) : null,
      ].filter(Boolean);

      const existsAny = (await Promise.all(candidatePaths.map(fileExists))).some(Boolean);
      if (!existsAny) {
        errors.push(`${ctx}: photo file not found in /public/headshots: tried ${candidatePaths.map((p) => path.basename(p)).join(', ')}`);
      } else if (!isWebp) {
        const webpPath = path.join(HEADSHOTS_DIR, filename.replace(/\.[a-zA-Z0-9]+$/, '.webp'));
        if (!(await fileExists(webpPath))) {
          warnings.push(`${ctx}: webp variant missing (${path.basename(webpPath)}). Consider adding for performance.`);
        }
      }
    } else if (!m.photo) {
      // No photo provided → allowed, will use placeholder
      warnings.push(`${ctx}: no photo provided; placeholder will be used`);
    }
  }

  if (warnings.length) {
    console.log('\n[team] Warnings:');
    for (const w of warnings) console.log(' -', w);
  }

  if (errors.length) {
    console.error('\n[team] Errors:');
    for (const e of errors) console.error(' -', e);
    console.error(`\n[team] Validation failed with ${errors.length} error(s).`);
    process.exit(1);
  } else {
    console.log(`\n[team] Validation passed. ${data.length} member(s) validated.`);
  }
};

main().catch((err) => {
  console.error('[team] Validation error:', err);
  process.exit(1);
});


