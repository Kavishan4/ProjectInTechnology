import express from 'express';
import sql from '../db.js';

const router = express.Router();

// GET /api/auth/login - find user by email
router.post('/login', async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // Try to find existing user
    let rows = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (rows.length === 0) {
      // Create new user if not found
      rows = await sql`
        INSERT INTO users (email, name, role)
        VALUES (${email}, ${name || email.split('@')[0]}, 'Fresher')
        RETURNING *
      `;
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH /api/auth/role - update user role to Mentor
router.patch('/role', async (req, res) => {
  const { email, role, mentorInfo } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const rows = await sql`
      UPDATE users
      SET role = ${role || 'Mentor'}
      WHERE email = ${email}
      RETURNING *
    `;
    res.json(rows[0]);
  } catch (err) {
    console.error('Role update error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
