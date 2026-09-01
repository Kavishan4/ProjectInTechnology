import express from 'express';
import sql from '../db.js';

const router = express.Router();

// GET /api/community - get all posts, newest first
router.get('/', async (req, res) => {
  try {
    const posts = await sql`SELECT * FROM community_posts ORDER BY created_at DESC`;
    res.json(posts);
  } catch (err) {
    console.error('Fetch community posts error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/community - create a new post
router.post('/', async (req, res) => {
  const { author_name, author_email, content } = req.body;
  if (!author_name || !content) {
    return res.status(400).json({ error: 'author_name and content are required' });
  }

  try {
    const rows = await sql`
      INSERT INTO community_posts (author_name, author_email, content)
      VALUES (${author_name}, ${author_email || null}, ${content})
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH /api/community/:id/like - increment likes
router.patch('/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await sql`
      UPDATE community_posts
      SET likes = likes + 1
      WHERE id = ${id}
      RETURNING *
    `;
    res.json(rows[0]);
  } catch (err) {
    console.error('Like post error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/community/:id - delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM community_posts WHERE id = ${id}`;
    res.json({ success: true });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
