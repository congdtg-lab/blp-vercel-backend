import { supabase } from './supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { book_slug, filename } = req.query || {};

    if (!book_slug || !filename) {
      return res.status(400).json({ error: 'Missing required query params: book_slug, filename' });
    }

    const { data, error } = await supabase
      .from('shared_courses')
      .select('*')
      .eq('book_slug', book_slug)
      .eq('filename', filename)
      .maybeSingle();

    if (error) {
      console.error('Supabase error (load-shared-course):', error);
      return res.status(500).json({ error: 'Failed to load shared course', details: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Course file not found' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Handler error (load-shared-course):', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
