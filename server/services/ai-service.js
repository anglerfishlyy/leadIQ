const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class LeadFilterService {
  async filterLeads(leads, criteria) {
    const prompt = this._buildFilterPrompt(leads, criteria);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a lead scoring expert that evaluates sales leads."
      }, {
        role: "user",
        content: prompt
      }],
      temperature: 0.7
    });

    return this._parseAIResponse(completion.choices[0].message.content, leads);
  }

  _buildFilterPrompt(leads, criteria) {
    return `Please analyze these sales leads and rate them from 1-10 based on:
    - Job title relevance (${criteria.targetTitles.join(', ')})
    - Company size fit (${criteria.idealCompanySize})
    - Industry match (${criteria.targetIndustries.join(', ')})
    
    Leads to analyze: ${JSON.stringify(leads)}`;
  }

  _parseAIResponse(aiResponse, originalLeads) {
    try {
      const scores = JSON.parse(aiResponse);
      return originalLeads.map((lead, index) => ({
        ...lead,
        score: scores[index] || 5,
        aiNotes: scores[index] > 7 ? 'High potential' : 'Standard lead'
      }));
    } catch {
      console.warn('AI response parsing failed, using default scores');
      return originalLeads.map(lead => ({ ...lead, score: 5 }));
    }
  }
}

module.exports = new LeadFilterService();