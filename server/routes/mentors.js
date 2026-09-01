import express from 'express';
import sql from '../db.js';

const router = express.Router();

// GET /api/mentors - fetch all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await sql`SELECT * FROM mentors ORDER BY rating DESC`;
    res.json(mentors);
  } catch (err) {
    console.error('Fetch mentors error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/mentors - register a new mentor
router.post('/', async (req, res) => {
  const { name, faculty, university, subjects, avatar, user_id } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const rows = await sql`
      INSERT INTO mentors (name, faculty, university, subjects, avatar, user_id)
      VALUES (
        ${name},
        ${faculty || null},
        ${university || null},
        ${subjects || null},
        ${avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'},
        ${user_id || null}
      )
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Add mentor error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
