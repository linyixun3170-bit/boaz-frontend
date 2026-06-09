import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 md:pt-40 pb-24 section-padding bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto">
        <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">
          Legal
        </p>
        <h1 className="text-display-lg font-serif text-charcoal mb-8">
          Privacy Policy
        </h1>
        <p className="text-body-sm text-muted mb-12">
          Last updated: June 9, 2026
        </p>

        <div className="prose prose-sm max-w-none text-muted space-y-6">
          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">1. Information We Collect</h2>
            <p>
              When you submit an inquiry or contact form on our website, we collect the following personal information:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Phone number</li>
              <li>WeChat ID (if provided)</li>
              <li>Country and shipping address</li>
              <li>Inquiry type and order details</li>
              <li>IP address and country of origin (via Cloudflare headers, used for fraud prevention only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">2. How We Use Your Information</h2>
            <p>We use the collected information solely for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Responding to your inquiries and providing quotes</li>
              <li>Processing orders and managing production</li>
              <li>Sending relevant business communications</li>
              <li>Improving our products and services</li>
            </ul>
            <p className="mt-2">We do not sell, rent, or share your personal information with third parties for their marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">3. Data Storage and Security</h2>
            <p>
              Your data is stored securely in Feishu (Lark) Bitable, a cloud-based business management platform. 
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">4. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, 
              or as required by applicable law. Inquiry records are typically retained for 3 years after the last contact.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:sale@boaz-clothes.com" className="underline text-charcoal">sale@boaz-clothes.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">6. Third-Party Services</h2>
            <p>We use the following third-party services to operate our business:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Cloudflare (CDN, DNS, security)</li>
              <li>Feishu / Lark (business management and communication)</li>
              <li>GitHub (source code hosting)</li>
            </ul>
            <p className="mt-2">Each of these providers has their own privacy policies governing data handling.</p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">7. Cookies</h2>
            <p>
              This website does not use tracking cookies. Cloudflare may set essential cookies for security and performance purposes. 
              No analytics cookies are currently deployed.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">8. International Data Transfers</h2>
            <p>
              As a China-based manufacturer serving international clients, your data may be transferred to and processed in China. 
              By submitting your information, you consent to this transfer. We take appropriate safeguards to ensure your data is protected.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">9. Contact</h2>
            <p>
              For questions about this privacy policy, please contact us at{" "}
              <a href="mailto:sale@boaz-clothes.com" className="underline text-charcoal">sale@boaz-clothes.com</a>{" "}
              or via WhatsApp at +86 188 6879 8631.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-stone">
          <Link href="/" className="text-body-sm text-charcoal underline hover:text-gold transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
