"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/why-boaz" },
    { label: "Factory", href: "/why-boaz" },
    { label: "Quality", href: "/why-boaz" },
  ],
  Products: [
    { label: "T-Shirts", href: "/wholesale" },
    { label: "Hoodies", href: "/wholesale" },
    { label: "Custom", href: "/contact" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/why-boaz" },
    { label: "Shipping", href: "/why-boaz" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream section-padding py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="font-serif text-2xl tracking-tight text-cream block mb-4">
              BOAZ
            </Link>
            <p className="text-body-sm text-subtle max-w-xs leading-relaxed">
              Premium apparel manufacturing. From Hebei to the world. No middlemen. No surprises.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="text-caption uppercase tracking-widest text-subtle mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-cream/70 hover:text-cream transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-caption uppercase tracking-widest text-subtle mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="mailto:sale@boaz-clothes.com"
                className="flex items-center gap-2 text-body-sm text-cream/70 hover:text-cream transition-colors duration-300"
              >
                <Mail size={14} />
                sale@boaz-clothes.com
              </a>
              <a
                href="https://wa.me/8618868798631"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-cream/70 hover:text-cream transition-colors duration-300"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-warmink/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-subtle">
            © {new Date().getFullYear()} BOAZ Apparel. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-caption text-subtle hover:text-cream transition-colors duration-300">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-caption text-subtle hover:text-cream transition-colors duration-300">Terms</Link>
            {["Instagram", "LinkedIn", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-caption text-subtle hover:text-cream transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
