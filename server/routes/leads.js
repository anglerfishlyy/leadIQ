const express = require('express');
const router = express.Router();
const leadFilter = require('../services/ai-service');
const { validateLeadSearch } = require('../middleware/validate');

// Get filtered leads
router.post('/search', validateLeadSearch, async (req, res) => {
  try {
    const { jobTitle, location, industry } = req.body;
    
    // We'll replace this with real scraping later
    const mockLeads = [
      { name: 'John Doe', title: 'CEO', company: 'Tech Corp' },
      { name: 'Jane Smith', title: 'CTO', company: 'Dev Inc' }
    ];

    const filteredLeads = await leadFilter.filterLeads(mockLeads, {
      targetTitles: [jobTitle],
      idealCompanySize: 'any',
      targetIndustries: industry ? [industry] : []
    });

    res.json(filteredLeads);
  } catch (error) {
    console.error('Search failed:', error);
    res.status(500).json({ error: 'Failed to search leads' });
  }
});

module.exports = router;