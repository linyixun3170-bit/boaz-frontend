"use client";

import Script from "next/script";

// ============================================================
// 📊 Google Analytics 4 + GTM
//
// 替换 GA_MEASUREMENT_ID 为你自己的 GA4 跟踪 ID
// 格式: G-XXXXXXXXXX
// ============================================================

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export default function Analytics() {
  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.warn("[Analytics] GA_MEASUREMENT_ID not configured. Set your GA4 ID in components/Analytics.tsx");
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            send_page_view: true,
            custom_map: {
              'dimension1': 'page_type',
              'dimension2': 'user_type'
            }
          });
        `}
      </Script>
    </>
  );
}
