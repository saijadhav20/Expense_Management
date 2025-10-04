const { Pool } = require("pg");
require("dotenv").config();

// Create a new connection pool
const pool = new Pool({
  user: process.env.DB_USER,     
  host: process.env.DB_HOST,     
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  port: process.env.DB_PORT,     
});

// Test the connection when the server starts
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ PostgreSQL connection error:", err.stack);
  });

module.exports = pool;
