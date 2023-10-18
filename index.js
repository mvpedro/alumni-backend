const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  host: 'db', // this should match the service name in docker-compose
  port: 5432,
  database: 'mydb',
  user: 'myuser',
  password: 'mypassword',
});

app.get('/', async (req, res) => {
  const client = await pool.connect();
  const result = await client.query('SELECT NOW()');
  const currentTime = result.rows[0].now;
  client.release();
  res.send(`Database connected! Current time: ${currentTime}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
