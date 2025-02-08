const express = require('express');
const router = express.Router();

// Get all leads - basic version
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Leads endpoint working' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

module.exports = router;