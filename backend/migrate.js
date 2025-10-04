import fs from "fs";
import path from "path";
import pool from "./config/db.js";

const runMigration = async (file) => {
  const sql = fs.readFileSync(path.join("migrations", file), "utf-8");
  try {
    await pool.query(sql);
    console.log(`${file} executed successfully`);
  } catch (err) {
    console.error(`Error running ${file}:`, err);
  }
};

const migrate = async () => {
  await runMigration("001_create_users.sql");
  await runMigration("002_create_company.sql");
  await runMigration("003_create_expenses.sql");
  process.exit();
};

migrate();
