import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, X, Sparkles } from 'lucide-react';
import { EstimateFormData } from '../types';

interface EstimateFormProps {
  initialValues?: {
    serviceType?: string;
    materialInterest?: string;
    description?: string;
  };
  onClearInitialValues?: () => void;
}

export const EstimateForm: React.FC<EstimateFormProps> = ({
  initialValues,
  onClearInitialValues,
}) => {
  const [formData, setFormData] = useState<EstimateFormData>({
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    serviceType: 'Roof Replacement',
    materialInterest: 'Architectural Dimensional Shingles',
    preferredContact: 'phone',
    projectTimeline: '1-3 months',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EstimateFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    timestamp: string;
  } | null>(null);

  // Sync initial values when updated from Ballpark Estimator or Service card
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setSubmittedData(null);
      setFormData((prev) => ({
        ...prev,
        serviceType: initialValues.serviceType || prev.serviceType,
        materialInterest: initialValues.materialInterest || prev.materialInterest,
        description: initialValues.description || prev.description,
      }));
    }
  }, [initialValues]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof EstimateFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Full name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a 10-digit phone number with area code.';
    }

    if (!formData.zipCode.trim()) {
      errs.zipCode = 'ZIP code is required.';
    } else if (!/^\d{5}$/.test(formData.zipCode.trim())) {
      errs.zipCode = 'Please enter a valid 5-digit US ZIP code.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic asynchronous client-side submission with clear demo status
    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = `RIDGELINE-NC-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        referenceId: randomId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 700);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      zipCode: '',
      serviceType: 'Roof Replacement',
      materialInterest: 'Architectural Dimensional Shingles',
      preferredContact: 'phone',
      projectTimeline: '1-3 months',
      description: '',
    });
    setErrors({});
    if (onClearInitialValues) onClearInitialValues();
  };

  return (
    <section id="estimate" className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#2a2c27] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D9FF36] tracking-wider uppercase">
              <span>ZERO COMMISSIONS · NO PRESSURE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Request your clear,<br />
              <span className="text-[#D9FF36]">itemized estimate.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#777970] leading-relaxed">
              Tell us a few details about your property. We schedule an on-site 45-minute drone & attic audit and send you a binding proposal before any contracts are drawn.
            </p>

            {/* Quick Guarantees Card */}
            <div className="p-6 rounded-2xl bg-[#111210] border border-[#2a2c27] space-y-4">
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                OUR ESTIMATE COMMITMENTS:
              </div>

              <div className="flex items-start gap-3 text-xs text-[#E9E9E2]">
                <ShieldCheck className="w-4 h-4 text-[#D9FF36] shrink-0 mt-0.5" />
                <span>
                  <strong>No Surprise Change Orders:</strong> Rotted decking sheet replacement rates are pre-disclosed upfront ($85/plywood sheet).
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#E9E9E2]">
                <ShieldCheck className="w-4 h-4 text-[#D9FF36] shrink-0 mt-0.5" />
                <span>
                  <strong>30-Day Guaranteed Pricing:</strong> Material cost volatility is absorbed by us once the written quote is signed.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#E9E9E2]">
                <ShieldCheck className="w-4 h-4 text-[#D9FF36] shrink-0 mt-0.5" />
                <span>
                  <strong>Private & Secure:</strong> We never share or sell contact info to third-party home improvement lead brokers.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111210]/60 border border-[#2a2c27] text-xs text-[#777970]">
              <span className="text-[#D9FF36] font-mono font-bold">DEMO SUBMISSION NOTICE: </span>
              This form operates client-side for demonstration purposes. Submissions generate a local ticket confirmation for testing.
            </div>
          </div>

          {/* Right Column: Form or Success Confirmation Card */}
          <div className="lg:col-span-7 bg-[#111210] border border-[#2a2c27] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {submittedData ? (
              /* Success Confirmation View */
              <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#D9FF36]/20 border border-[#D9FF36] text-[#D9FF36] flex items-center justify-center mx-auto shadow-lg shadow-[#D9FF36]/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#D9FF36] uppercase tracking-widest">
                    REQUEST RECEIVED · DEMO CONFIRMATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Thank you, {formData.fullName.split(' ')[0]}!
                  </h3>
                  <p className="text-sm text-[#777970] max-w-md mx-auto leading-relaxed">
                    Your request for <strong className="text-white">{formData.serviceType}</strong> in ZIP <strong className="text-white">{formData.zipCode}</strong> has been logged into our demo queue.
                  </p>
                </div>

                {/* Ticket Summary Box */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#1B1D19] border border-[#2a2c27] text-left text-xs space-y-2.5 font-mono">
                  <div className="flex justify-between border-b border-[#2a2c27] pb-2">
                    <span className="text-[#777970]">TICKET REF:</span>
                    <span className="text-[#D9FF36] font-bold">{submittedData.referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777970]">CONTACT VIA:</span>
                    <span className="text-white capitalize">{formData.preferredContact} ({formData.phone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777970]">TIMELINE:</span>
                    <span className="text-white capitalize">{formData.projectTimeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777970]">MATERIAL INTEREST:</span>
                    <span className="text-white">{formData.materialInterest}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#2a2c27]">
                    <span className="text-[#777970]">DEMO STATUS:</span>
                    <span className="text-emerald-400">TEST DATA LOGGED (NO REAL EMAILS SENT)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Submit Another Estimate Request</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Lead Capture Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Form header indicator if pre-filled */}
                {initialValues?.description && (
                  <div className="p-3 rounded-lg bg-[#1B1D19] border border-[#D9FF36]/40 flex items-center justify-between text-xs text-[#E9E9E2]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D9FF36]" />
                      <span>Estimate parameters imported from Ballpark Calculator</span>
                    </div>
                    {onClearInitialValues && (
                      <button
                        type="button"
                        onClick={onClearInitialValues}
                        className="text-[#777970] hover:text-white"
                        aria-label="Clear imported estimate"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* 2-Column Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-white mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Sarah Lindquist"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#1B1D19] border text-sm text-white placeholder-[#777970] focus:outline-none focus:ring-2 focus:ring-[#D9FF36] transition-all ${
                        errors.fullName ? 'border-rose-500' : 'border-[#2a2c27]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-white mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#1B1D19] border text-sm text-white placeholder-[#777970] focus:outline-none focus:ring-2 focus:ring-[#D9FF36] transition-all ${
                        errors.email ? 'border-rose-500' : 'border-[#2a2c27]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-white mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="e.g. (919) 555-0184"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#1B1D19] border text-sm text-white placeholder-[#777970] focus:outline-none focus:ring-2 focus:ring-[#D9FF36] transition-all ${
                        errors.phone ? 'border-rose-500' : 'border-[#2a2c27]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label htmlFor="zipCode" className="block text-xs font-semibold text-white mb-1.5">
                      Triangle ZIP Code *
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      maxLength={5}
                      required
                      placeholder="e.g. 27707 (Durham/Raleigh)"
                      value={formData.zipCode}
                      onChange={(e) => {
                        setFormData({ ...formData, zipCode: e.target.value });
                        if (errors.zipCode) setErrors({ ...errors, zipCode: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#1B1D19] border text-sm text-white placeholder-[#777970] focus:outline-none focus:ring-2 focus:ring-[#D9FF36] transition-all ${
                        errors.zipCode ? 'border-rose-500' : 'border-[#2a2c27]'
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.zipCode}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Dropdown & Material Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="serviceType" className="block text-xs font-semibold text-white mb-1.5">
                      Service Needed
                    </label>
                    <select
                      id="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1B1D19] border border-[#2a2c27] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D9FF36] cursor-pointer"
                    >
                      <option value="Roof Replacement">Roof Replacement (Full Tear-off)</option>
                      <option value="Precision Roof Repair">Precision Roof Repair (Leaks / Flashing)</option>
                      <option value="Storm Damage Inspection">Storm & Hail Inspection (Insurance)</option>
                      <option value="Inspection & Preventive Tune-Up">Inspection & Preventive Tune-Up</option>
                      <option value="Not Sure Yet">Not Sure Yet (Need Assessment)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="materialInterest" className="block text-xs font-semibold text-white mb-1.5">
                      Material Preference
                    </label>
                    <select
                      id="materialInterest"
                      value={formData.materialInterest}
                      onChange={(e) => setFormData({ ...formData, materialInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1B1D19] border border-[#2a2c27] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D9FF36] cursor-pointer"
                    >
                      <option value="Architectural Dimensional Shingles">Architectural Shingles (Most Popular)</option>
                      <option value="Matte Standing Seam Metal">Matte Standing Seam Metal (50+ Yr)</option>
                      <option value="Class 4 Impact-Resistant Shingles">Class 4 Impact-Resistant (Hail Proof)</option>
                      <option value="Synthetic Composite Slate">Synthetic Composite Slate (Heritage)</option>
                      <option value="Single-Ply TPO Membrane">Single-Ply TPO Flat Roof</option>
                      <option value="Open to Recommendation">Open to Expert Recommendation</option>
                    </select>
                  </div>
                </div>

                {/* Timeline and Preferred Contact Radio options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-white mb-1.5">Project Timeline</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'immediate', label: 'Urgent' },
                        { id: '1-3 months', label: '1–3 Mos' },
                        { id: 'planning', label: 'Planning' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectTimeline: t.id as any })}
                          className={`py-2 px-2 text-xs font-semibold rounded-lg text-center transition-all cursor-pointer border ${
                            formData.projectTimeline === t.id
                              ? 'bg-[#D9FF36] text-[#111210] border-[#D9FF36] font-bold'
                              : 'bg-[#1B1D19] border-[#2a2c27] text-[#E9E9E2] hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-white mb-1.5">Preferred Contact</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'phone', label: 'Call' },
                        { id: 'text', label: 'Text' },
                        { id: 'email', label: 'Email' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: c.id as any })}
                          className={`py-2 px-2 text-xs font-semibold rounded-lg text-center transition-all cursor-pointer border ${
                            formData.preferredContact === c.id
                              ? 'bg-[#D9FF36] text-[#111210] border-[#D9FF36] font-bold'
                              : 'bg-[#1B1D19] border-[#2a2c27] text-[#E9E9E2] hover:text-white'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-white mb-1.5">
                    Project Details / Specific Roof Observations (Optional)
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    placeholder="Tell us about leaks, roof age, storm dates, or questions you'd like our inspector to review..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1B1D19] border border-[#2a2c27] text-sm text-white placeholder-[#777970] focus:outline-none focus:ring-2 focus:ring-[#D9FF36] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111210] bg-[#D9FF36] hover:bg-[#e4ff6b] active:scale-[0.99] rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#D9FF36]/20 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Demo Estimate...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Estimate Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
