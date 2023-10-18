const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

const pool = new Pool({
  host: 'db',
  port: 5432,
  database: 'mydb',
  user: 'myuser',
  password: 'mypassword',
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }
  try {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email]);
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
