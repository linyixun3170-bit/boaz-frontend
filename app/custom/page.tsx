"use client";

import dynamic from "next/dynamic";

const CustomPageInner = dynamic(() => import("./CustomPageInner"), {
  ssr: false,
});

export default function CustomPage() {
  return <CustomPageInner />;
}
