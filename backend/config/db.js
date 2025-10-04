import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

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

export default pool; // ✅ ES module export
<<<<<<< HEAD
=======

>>>>>>> 8584c13e34807ce8b0d680ed1cea1cb1c0e64770
