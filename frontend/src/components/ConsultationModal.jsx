import { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { submitContact } from '../lib/contact';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    website: '', // honeypot: hidden from people, filled in by spam bots
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitContact(formData);
      setFormSubmitted(true);
    } catch (err) {
      console.error('Consultation form submission error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      website: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        className="relative w-full max-w-2xl bg-[#121212] border border-white/15 text-white rounded-none shadow-2xl p-8 sm:p-10 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors border border-white/10 rounded-full hover:border-white/30 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {formSubmitted ? (
          <div className="text-center py-12 space-y-6 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold font-syne uppercase tracking-tight">
              Consultation Request Received
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to 2BHK Interiors. Our lead interior architect will review your project requirements and get in touch within 30 minutes — guaranteed.
            </p>
            <button
              onClick={handleReset}
              className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
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
              <h2 id="consultation-title" className="text-2xl sm:text-3xl font-bold font-syne tracking-tight">
                Design Your Space With Us
              </h2>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Fill this form and get a tailored interior design quote in 30 minutes — guaranteed. Let our experts take over!
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 rounded">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="consult-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    id="consult-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="consult-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    id="consult-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number & Company/City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="consult-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    id="consult-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your mobile number"
                    autoComplete="tel"
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="consult-company" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Locality / City (Optional)
                  </label>
                  <input
                    type="text"
                    id="consult-company"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Andheri West, Mumbai"
                    className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Project Notes / Vision */}
              <div>
                <label htmlFor="consult-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Project Notes / Vision
                </label>
                <textarea
                  rows={4}
                  id="consult-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your space, preferred materials, or timeline requirements..."
                  className="w-full bg-neutral-900 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="consult-website">Leave this field empty</label>
                <input
                  id="consult-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white py-3 px-6 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
