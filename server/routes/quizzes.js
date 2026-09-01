import express from 'express';
import sql from '../db.js';

const router = express.Router();

// GET /api/quiz-results?email=user@email.com - get quiz results for a user
router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'email query param required' });

  try {
    const results = await sql`
      SELECT * FROM quiz_results
      WHERE user_email = ${email}
      ORDER BY created_at DESC
    `;
    res.json(results);
  } catch (err) {
    console.error('Fetch quiz results error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/quiz-results - save a quiz result
router.post('/', async (req, res) => {
  const { user_email, subject, score, total } = req.body;
  if (!user_email || !subject || score === undefined || !total) {
    return res.status(400).json({ error: 'user_email, subject, score, and total are required' });
  }

  try {
    const rows = await sql`
      INSERT INTO quiz_results (user_email, subject, score, total)
      VALUES (${user_email}, ${subject}, ${score}, ${total})
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Save quiz result error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
