const express = require('express');
const router = express.Router();
const leadFilter = require('../services/ai-service');
const { validateLeadSearch } = require('../middleware/validate');
const { searchLimiter } = require('../middleware/rateLimiter');

// Track failed requests for monitoring
let failedRequests = 0;

// Get filtered leads
router.post('/search', searchLimiter, validateLeadSearch, async (req, res) => {
  try {
    const { jobTitle, location, industry } = req.body;
    
    // For now using mock data - we'll integrate real scraping later
    const mockLeads = [
      { name: 'Krishna allakuntla', title: 'CEO', company: 'Tech Corp' },
      { name: 'pooja ramaswamy', title: 'CEO', company: 'Dev Inc' }
    ];

    const filteredLeads = await leadFilter.filterLeads(mockLeads, {
      targetTitles: [jobTitle],
      idealCompanySize: 'any',
      targetIndustries: industry ? [industry] : []
    });

    // Reset failed requests counter on success
    failedRequests = 0;

    res.json(filteredLeads);
  } catch (error) {
    failedRequests++;
    console.error(`Search failed (${failedRequests} recent failures):`, error);
    
    // Alert if too many failures
    if (failedRequests > 10) {
      // TODO: Send alert to admin
      console.error('ALERT: High failure rate detected');
    }

    res.status(500).json({ error: 'Failed to search leads' });
  }
});

module.exports = router;