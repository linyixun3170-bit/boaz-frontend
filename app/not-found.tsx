"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center section-padding">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-display-xl font-serif text-charcoal mb-4">
            404
          </h1>
          <p className="text-body-lg text-muted mb-2">
            Page not found
          </p>
          <p className="text-body-sm text-subtle mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="pill-btn-filled inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
