import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const dbPath = process.env.DB_FILE_PATH
  ? path.join(process.cwd(), process.env.DB_FILE_PATH)
  : path.join(process.cwd(), 'db', 'database.sqlite');

const db = new Database(dbPath);

export default db;
