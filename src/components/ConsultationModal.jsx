import { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Interiors',
    budget: '$50,000 - $100,000',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/15 text-white rounded-none shadow-2xl p-8 sm:p-10 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors border border-white/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {formSubmitted ? (
          <div className="text-center py-12 space-y-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold font-syne uppercase">Consultation Request Received</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to 2BHK Interiors. Our lead interior architect will review your project requirements and get in touch within 24 business hours.
            </p>
            <button
              onClick={handleReset}
              className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase font-syne block mb-1">
                PRIVATE CONSULTATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-syne tracking-tight">
                Design Your Space With Us
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Residential Interiors">Residential Interiors</option>
                    <option value="Commercial Spaces">Commercial Spaces</option>
                    <option value="Renovation & Styling">Renovation & Styling</option>
                    <option value="Architectural Lighting">Architectural Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                    <option value="$250,000+">$250,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Project Notes / Vision
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your space, preferred materials, or timeline requirements..."
                  className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white py-3 px-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2"
                >
                  <span>Submit Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
