import Database from "better-sqlite3";
import path from "node:path";

const resolvedPath = path.join(process.cwd(), "data", "skillshop.db");

let database: Database.Database | undefined;

export function getDatabase() {
  if (!database) {
    database = new Database(resolvedPath, { readonly: true, fileMustExist: true });
  }

  return database;
}
