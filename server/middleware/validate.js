const validateLeadSearch = (req, res, next) => {
    const { jobTitle, location, industry } = req.body;
    
    if (!jobTitle) {
      return res.status(400).json({ error: 'Job title is required' });
    }
  
    // Sanitize inputs
    req.body.jobTitle = jobTitle.trim();
    if (location) req.body.location = location.trim();
    if (industry) req.body.industry = industry.trim();
    
    next();
  };
  
  module.exports = { validateLeadSearch };