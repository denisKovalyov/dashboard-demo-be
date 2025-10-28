import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../src/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedsDir = path.join(__dirname, 'seeds');
const files = fs.readdirSync(seedsDir).sort();

for (const file of files) {
  const sql = fs.readFileSync(path.join(seedsDir, file), 'utf-8');
  db.exec(sql);
  console.log(`🌱 Applied seed: ${file}`);
}
