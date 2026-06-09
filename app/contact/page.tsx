"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import HoneypotForm from "@/components/HoneypotForm";

const inquiryTypes = [
  { value: "wholesale", label: "Wholesale Pricing" },
  { value: "custom", label: "Custom Manufacturing" },
  { value: "sample", label: "Request Samples" },
  { value: "private-label", label: "Private Label Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    wechat: "",
    country: "",
    address: "",
    inquiryType: "wholesale",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
      gsap.fromTo(
        infoRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  // Field name → state key mapping (cf_ prefix avoids Chrome autofill)
  const fieldToState: Record<string, string> = {
    cf_name: "name",
    cf_email: "email",
    company: "company",
    phone: "phone",
    wechat: "wechat",
    country: "country",
    address: "address",
    inquiryType: "inquiryType",
    quantity: "quantity",
    message: "message",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const key = fieldToState[e.target.name] || e.target.name;
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    const honeypot = (formData.get('contact_url') as string) || '';

    // Honeypot check
    if (honeypot) {
      // Bot detected — silently reject
      setSubmitted(true);
      return;
    }

    setSending(true);
    setError(null);

    // ⏱ 超时保护: 8 秒无响应提醒用户
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("Request is taking longer than expected. We'll still get your message — or you can reach us directly on WhatsApp: +86 188 6879 8631");
    }, 8000);

    try {
      const payload = {
        name: formData.get('cf_name') as string || '',
        email: formData.get('cf_email') as string || '',
        company: formData.get('company') as string || '',
        phone: formData.get('phone') as string || '',
        wechat: formData.get('wechat') as string || '',
        country: formData.get('country') as string || '',
        address: formData.get('address') as string || '',
        inquiryType: formData.get('inquiryType') as string || 'wholesale',
        quantity: formData.get('quantity') as string || '',
        message: formData.get('message') as string || '',
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      // 如果已经超时报错了，不再覆盖错误信息
      if (err instanceof DOMException && err.name === 'AbortError') {
        // 超时提醒已经在上面设置了，不覆盖
      } else {
        clearTimeout(timeoutId);
        setError("Something went wrong. Please email us directly or reach us on WhatsApp: +86 188 6879 8631");
      }
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-heading text-3xl text-dark mb-4">
            Thank You! We&apos;ll Be in Touch
          </h1>
          <p className="text-warm-gray leading-relaxed mb-8">
            We&apos;ve received your inquiry and will respond within 24
            hours. For urgent requests, reach out via{" "}
            <a
              href="https://wa.me/8618868798631"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline"
            >
              WhatsApp
            </a>{" "}
            or email{" "}
            <a
              href="mailto:sale@boaz-clothes.com"
              className="text-gold underline"
            >
              sale@boaz-clothes.com
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  phone: "",
                  wechat: "",
                  country: "",
                  address: "",
                  inquiryType: "wholesale",
                  quantity: "",
                  message: "",
                });
              }}
              className="px-6 py-3 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all"
            >
              Send Another Inquiry
            </button>
            <Link
              href="/wholesale"
              className="px-6 py-3 border border-dark/20 text-dark text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-gold text-xs uppercase tracking-[0.2em]">
          Get In Touch
        </span>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">
          Start Your Project
        </h1>
        <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
          Tell us about your project and we&apos;ll get back to you within 24
          hours with pricing, lead times, and sample options.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div ref={formRef} className="lg:col-span-3">
          <HoneypotForm onSubmit={handleSubmit} fieldName="contact_url">
            <div className="space-y-6">
              {/* Chrome autofill bait fields — hidden, Chrome fills these instead of real fields */}
              <div style={{position:'absolute',left:'-9999px',opacity:0,height:0,overflow:'hidden'}} aria-hidden="true">
                <input type="text" name="fake-name" tabIndex={-1} defaultValue="" />
                <input type="email" name="fake-email" tabIndex={-1} defaultValue="" />
                <input type="text" name="fake-company" tabIndex={-1} defaultValue="" />
              </div>
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-dark mb-2"
                  >
                    Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="cf_name"
                    required
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider text-dark mb-2"
                  >
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="cf_email"
                    required
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Company + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs uppercase tracking-wider text-dark mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="off" value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="Your brand or company"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider text-dark mb-2"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="off" value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* WeChat (B2B specific) */}
              <div>
                <label
                  htmlFor="wechat"
                  className="block text-xs uppercase tracking-wider text-dark mb-2"
                >
                  WeChat (Optional)
                </label>
                <input
                  type="text"
                  id="wechat"
                  name="wechat"
                  autoComplete="off" value={formData.wechat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                  placeholder="Your WeChat ID"
                />
              </div>

              {/* Country + Address — for shipping cost calculation */}
              <div className="bg-warmgray/30 rounded-xl p-4 mb-2">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-3">
                  📦 Shipping Information — helps us calculate accurate freight costs
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-xs uppercase tracking-wider text-dark mb-2"
                    >
                      Country / Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="off"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                    >
                      <option value="">Select country...</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="CH">Switzerland</option>
                      <option value="SE">Sweden</option>
                      <option value="NO">Norway</option>
                      <option value="DK">Denmark</option>
                      <option value="FI">Finland</option>
                      <option value="IE">Ireland</option>
                      <option value="AT">Austria</option>
                      <option value="PT">Portugal</option>
                      <option value="GR">Greece</option>
                      <option value="PL">Poland</option>
                      <option value="TR">Turkey</option>
                      <option value="AE">UAE</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="IL">Israel</option>
                      <option value="ZA">South Africa</option>
                      <option value="NG">Nigeria</option>
                      <option value="KE">Kenya</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                      <option value="JP">Japan</option>
                      <option value="KR">South Korea</option>
                      <option value="SG">Singapore</option>
                      <option value="MY">Malaysia</option>
                      <option value="TH">Thailand</option>
                      <option value="VN">Vietnam</option>
                      <option value="PH">Philippines</option>
                      <option value="ID">Indonesia</option>
                      <option value="IN">India</option>
                      <option value="HK">Hong Kong</option>
                      <option value="TW">Taiwan</option>
                      <option value="CN">China</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-xs uppercase tracking-wider text-dark mb-2"
                    >
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="off"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="City, State, Postal code"
                    />
                  </div>
                </div>
              </div>

              {/* Inquiry type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-xs uppercase tracking-wider text-dark mb-2"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType" autoComplete="off"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                  >
                    {inquiryTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-xs uppercase tracking-wider text-dark mb-2"
                  >
                    Est. Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    autoComplete="off" value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="e.g. 100–500 units"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-dark mb-2"
                >
                  Project Details <span className="text-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                  placeholder="Tell us about your project — products, quantities, timeline, customization needs..."
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-10 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </div>
          </HoneypotForm>
        </div>

        {/* Contact info sidebar */}
        <div ref={infoRef} className="lg:col-span-2">
          <div className="sticky top-28 space-y-6">
            {/* Quick contact card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-light-gray">
              <h3 className="font-heading text-xl text-dark mb-6">
                How to Reach Us
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gold mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:sale@boaz-clothes.com"
                    className="text-sm text-dark hover:text-gold transition-colors"
                  >
                    sale@boaz-clothes.com
                  </a>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gold mb-1">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/8618868798631"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-dark hover:text-gold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    +86 188 6879 8631 (Andrew)
                  </a>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gold mb-1">
                    WeChat
                  </p>
                  <p className="text-sm text-dark">Richel</p>
                </div>
              </div>

              {/* Response time badge */}
              <div className="mt-6 pt-6 border-t border-light-gray">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-warm-gray">
                    We respond within <strong className="text-dark">24 hours</strong> on business days
                  </p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-cream rounded-2xl p-6 border border-light-gray">
              <h3 className="text-xs uppercase tracking-wider text-gold mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Browse Products", href: "/wholesale" },
                  { label: "Custom Manufacturing", href: "/custom" },
                  { label: "Why BOAZ?", href: "/why-boaz" },
                  { label: "Request Samples", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-dark/70 hover:text-gold transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
