import express from 'express';
import page from '../models/Page.js';

const router = express.Router();
router.use((req, res, next) => {
  console.log('🧪 req.headers.content-type:', req.headers['content-type']);
  next();
});
// Add a new page
router.post('/add', async (req, res) => {
  try {
    console.log('Received POST /add with body:', req.body);

    const { PageName, slug, description, keywords, metaDesc } = req.body;

    if (!PageName || !slug || !description) {
      return res.status(400).json({ error: 'PageName, slug, and description are required' });
    }

    const exists = await page.findOne({ slug });
    if (exists) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const newPage = new page({ PageName, slug, description, keywords, metaDesc });
    await newPage.save();

    res.status(201).json({
      message: 'Page added successfully',
      page: newPage,
    });
  } catch (err) {
    console.error('❌ Error in POST /add:', err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});


// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await page.find();
    res.json(pages);
  } catch (err) {
    console.error('Error in GET /:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get page by slug
router.get('/:slug', async (req, res) => {
  try {
    const foundPage = await page.findOne({ slug: req.params.slug });
    if (!foundPage) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(foundPage);
  } catch (err) {
    console.error('Error in GET /:slug:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
