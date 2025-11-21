import { supabase } from './supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { user_id, book_slug, progress } = req.body || {};

    if (!user_id || !book_slug || !progress) {
      return res.status(400).json({ error: 'Missing required fields: user_id, book_slug, progress' });
    }

    const { data, error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id,
          book_slug,
          progress,
        },
        { onConflict: 'user_id,book_slug' }
      )
      .select();

    if (error) {
      console.error('Supabase error (save-progress):', error);
      return res.status(500).json({ error: 'Failed to save progress', details: error.message });
    }

    return res.status(200).json({ status: 'ok', data });
  } catch (err) {
    console.error('Handler error (save-progress):', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
