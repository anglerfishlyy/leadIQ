class AnalyticsService {
    constructor() {
      // Store analytics in memory for now
      // Later we'll move this to a database
      this.signups = [];
      this.pageViews = new Map();
    }
  
    trackSignup(email, source, metadata = {}) {
      this.signups.push({
        email,
        source, // e.g., 'linkedin', 'twitter', 'direct'
        timestamp: new Date(),
        userAgent: metadata.userAgent,
        referrer: metadata.referrer,
        utmParams: metadata.utmParams
      });
  
      console.log(`New signup from ${source}: ${email}`);
      return this.getSignupStats();
    }
  
    trackPageView(page, metadata = {}) {
      const currentViews = this.pageViews.get(page) || 0;
      this.pageViews.set(page, currentViews + 1);
      
      console.log(`Page view: ${page} (Total: ${currentViews + 1})`);
    }
  
    getSignupStats() {
      return {
        total: this.signups.length,
        bySource: this.signups.reduce((acc, signup) => {
          acc[signup.source] = (acc[signup.source] || 0) + 1;
          return acc;
        }, {})
      };
    }
  
    getConversionRate() {
      const homePageViews = this.pageViews.get('/') || 0;
      return {
        rate: homePageViews ? (this.signups.length / homePageViews) * 100 : 0,
        views: homePageViews,
        signups: this.signups.length
      };
    }
  }
  
  module.exports = new AnalyticsService();