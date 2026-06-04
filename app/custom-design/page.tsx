"use client";

import dynamic from "next/dynamic";

const CustomDesignInner = dynamic(() => import("./CustomDesignInner"), {
  ssr: false,
});

export default function CustomDesignPage() {
  return <CustomDesignInner />;
}
