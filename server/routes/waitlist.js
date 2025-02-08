const express = require('express');
const router = express.Router();
const analytics = require('../services/analytics-service');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const source = req.query.utm_source || req.header('Referer') || 'direct';
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // Track signup with source
    const stats = analytics.trackSignup(email, source, {
      userAgent: req.header('User-Agent'),
      referrer: req.header('Referer'),
      utmParams: {
        source: req.query.utm_source,
        medium: req.query.utm_medium,
        campaign: req.query.utm_campaign
      }
    });

    res.json({ success: true, stats });
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = analytics.getSignupStats();
    const conversion = analytics.getConversionRate();
    res.json({ stats, conversion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;