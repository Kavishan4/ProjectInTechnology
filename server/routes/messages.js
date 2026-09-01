import express from 'express';
import sql from '../db.js';

const router = express.Router();

// GET /api/messages?user=name - get all messages for a user (sent + received)
router.get('/', async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: 'user query param required' });

  try {
    const messages = await sql`
      SELECT * FROM messages
      WHERE sender_name = ${user} OR receiver_name = ${user}
      ORDER BY created_at DESC
    `;
    res.json(messages);
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/messages - send a new message
router.post('/', async (req, res) => {
  const { sender_name, receiver_name, content } = req.body;
  if (!sender_name || !receiver_name || !content) {
    return res.status(400).json({ error: 'sender_name, receiver_name, and content are required' });
  }

  try {
    const rows = await sql`
      INSERT INTO messages (sender_name, receiver_name, content)
      VALUES (${sender_name}, ${receiver_name}, ${content})
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH /api/messages/:id/read - mark message as read
router.patch('/:id/read', async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await sql`
      UPDATE messages SET is_read = TRUE WHERE id = ${id} RETURNING *
    `;
    res.json(rows[0]);
  } catch (err) {
    console.error('Mark read error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH /api/messages/:id/reply - reply to a message
router.patch('/:id/reply', async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  if (!reply) return res.status(400).json({ error: 'reply content is required' });

  try {
    const rows = await sql`
      UPDATE messages
      SET reply = ${reply}, is_read = TRUE
      WHERE id = ${id}
      RETURNING *
    `;
    res.json(rows[0]);
  } catch (err) {
    console.error('Reply error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/messages/:id - delete a message
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM messages WHERE id = ${id}`;
    res.json({ success: true });
  } catch (err) {
    console.error('Delete message error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
