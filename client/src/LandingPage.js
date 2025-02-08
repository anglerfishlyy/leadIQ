import { useState } from 'react';
import { Send } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Generate High-Quality Leads in Minutes</h1>
          <p className="text-xl text-gray-300 mb-8">
            AI-powered lead generation for modern sales teams. 
            Stop wasting time on manual prospecting.
          </p>
          
          {/* Early Access Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                required
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Join <Send size={16} />
              </button>
            </form>
            
            {status === 'success' && (
              <p className="text-green-400 mt-2">Thanks! We'll be in touch soon.</p>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold mb-2">AI-Powered Filtering</h3>
            <p className="text-gray-300">Smart lead scoring and prioritization based on your ideal customer profile.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Export Anywhere</h3>
            <p className="text-gray-300">One-click export to CSV or direct integration with your CRM.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Verified Data</h3>
            <p className="text-gray-300">Every lead is verified to ensure accuracy and deliverability.</p>
          </div>
        </div>

        {/* Early Bird Pricing */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Early Bird Pricing</h2>
          <p className="text-xl text-gray-300 mb-2">Get 50% off our regular pricing forever</p>
          <p className="text-4xl font-bold text-blue-500">$49<span className="text-lg">/mo</span></p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 