import { supabase } from './supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { book_slug, filename, content, created_by } = req.body || {};

    if (!book_slug || !filename || !content) {
      return res.status(400).json({ error: 'Missing required fields: book_slug, filename, content' });
    }

    const { data, error } = await supabase
      .from('shared_courses')
      .upsert(
        {
          book_slug,
          filename,
          content,
          created_by: created_by || null
        },
        { onConflict: 'book_slug,filename' }
      )
      .select();

    if (error) {
      console.error('Supabase error (save-shared-course):', error);
      return res.status(500).json({ error: 'Failed to save shared course', details: error.message });
    }

    return res.status(200).json({ status: 'ok', data });
  } catch (err) {
    console.error('Handler error (save-shared-course):', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
