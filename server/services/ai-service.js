const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class LeadFilterService {
  async filterLeads(leads, criteria) {
    // Basic implementation - we'll enhance this
    return leads.map(lead => ({
      ...lead,
      score: 5 // Default score for now
    }));
  }
}

module.exports = new LeadFilterService();