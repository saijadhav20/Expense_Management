import pool from './config/db.js';

const cleanup = async () => {
  try {
    console.log('Dropping existing tables...');
    
    await pool.query('DROP TABLE IF EXISTS expenses CASCADE');
    console.log('✅ Dropped expenses table');
    
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('✅ Dropped users table');
    
    await pool.query('DROP TABLE IF EXISTS company CASCADE');
    console.log('✅ Dropped company table');
    
    console.log('✅ All tables dropped successfully');
  } catch (err) {
    console.error('❌ Error dropping tables:', err);
  } finally {
    process.exit();
  }
};

cleanup();