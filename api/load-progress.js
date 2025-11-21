import { supabase } from './supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { user_id, book_slug } = req.query || {};

    if (!user_id || !book_slug) {
      return res.status(400).json({ error: 'Missing required query params: user_id, book_slug' });
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user_id)
      .eq('book_slug', book_slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase error (load-progress):', error);
      return res.status(500).json({ error: 'Failed to load progress', details: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Handler error (load-progress):', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
