import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <main className="pt-32 md:pt-40 pb-24 section-padding bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto">
        <p className="text-caption uppercase tracking-[0.3em] text-muted mb-4">
          Legal
        </p>
        <h1 className="text-display-lg font-serif text-charcoal mb-8">
          Terms and Conditions
        </h1>
        <p className="text-body-sm text-muted mb-12">
          Last updated: June 9, 2026
        </p>

        <div className="prose prose-sm max-w-none text-muted space-y-6">
          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">1. General</h2>
            <p>
              These Terms and Conditions govern the use of the BOAZ Apparel website (boaz-clothes.com) 
              and the purchase of products and services from BOAZ Apparel (hereinafter &quot;BOAZ&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). 
              By accessing this website or placing an order, you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">2. Business Relationship</h2>
            <p>
              BOAZ Apparel is a B2B apparel manufacturer based in Hebei, China, with online sales operations in Hangzhou. 
              All transactions are conducted on a business-to-business (B2B) basis. We reserve the right to accept or decline 
              orders at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">3. Pricing and Quotations</h2>
            <p>
              All prices are quoted in USD and are FOB (Free On Board) from our production facility in Hebei, China, 
              unless otherwise stated. Prices do not include shipping, insurance, customs duties, or taxes unless explicitly stated. 
              Quotations are valid for 15 days from the date of issue, unless otherwise specified.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">4. Minimum Order Quantity (MOQ)</h2>
            <p>
              Our standard MOQ is 50 pieces per style and color, unless otherwise agreed in writing. 
              We may accept smaller quantities for samples or trial orders at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">5. Payment Terms</h2>
            <p>
              Payment terms are negotiated on a per-order basis. Standard terms are:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>30% deposit upon order confirmation</li>
              <li>70% balance before shipment</li>
            </ul>
            <p className="mt-2">
              Alternative payment terms may be arranged for established business relationships. 
              All payments are non-refundable once production has commenced.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">6. Samples</h2>
            <p>
              Sample costs are quoted individually and are fully deductible from the first bulk order. 
              Sample shipping costs are borne by the client. Samples are typically dispatched within 5-7 days of confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">7. Production and Lead Times</h2>
            <p>
              Standard production lead time is 5-7 business days for stock and custom orders, 
              unless otherwise agreed. Rush orders (3-day turnaround) are available upon request and subject to availability. 
              Large-volume orders may require extended timelines as specified in the order contract.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">8. Quality Control</h2>
            <p>
              All orders undergo pre-shipment inspection. We maintain quality control throughout the production process. 
              If a defect is found, we will either replace the defective items or issue a credit. 
              Claims must be made within 7 days of receipt of goods.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">9. Shipping and Risk</h2>
            <p>
              Risk of loss or damage passes to the buyer upon delivery to the carrier. 
              We are not responsible for shipping delays caused by carriers, customs clearance, or force majeure events. 
              Insurance is recommended and can be arranged at the buyer&apos;s request.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">10. Intellectual Property</h2>
            <p>
              Designs, logos, and artwork provided by the client remain the property of the client. 
              BOAZ will not reproduce or share client designs with third parties. 
              Clients warrant that they have the right to use any designs, logos, or artwork provided for production.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">11. Limitation of Liability</h2>
            <p>
              BOAZ&apos;s liability is limited to the value of the products purchased. 
              We are not liable for consequential damages, lost profits, or business interruption. 
              This limitation applies to the fullest extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">12. Governing Law</h2>
            <p>
              These terms are governed by the laws of the People&apos;s Republic of China. 
              Any disputes arising from these terms shall be resolved through friendly negotiation. 
              If negotiation fails, disputes shall be submitted to the jurisdiction of the courts in Hangzhou, China.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Changes will be posted on this page with an updated 
              &quot;Last updated&quot; date. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-body-lg font-semibold text-charcoal mb-3">14. Contact</h2>
            <p>
              For questions about these terms, please contact us at{" "}
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
