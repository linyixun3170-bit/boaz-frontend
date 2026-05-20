"use client";

import { useRef } from "react";

// ============================================================
// 🍯 Honeypot Anti-Spam（蜜罐防垃圾）
//
// 对人类不可见，对机器人是陷阱字段。
// 如果提交了 honeypot 字段，说明是垃圾机器人。
// 不需要验证码，用户体验零摩擦。
// ============================================================

interface HoneypotFormProps {
  children: React.ReactNode;
  onSubmit: (data: FormData) => void;
  fieldName?: string;
  className?: string;
}

export default function HoneypotForm({ children, onSubmit, fieldName = "website", className }: HoneypotFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const honeypot = formData.get(fieldName) as string;

      // 如果蜜罐字段被填充，说明是机器人
      if (honeypot) {
        console.log("[Honeypot] Spam submission blocked");
        // Still call onSubmit so the parent can handle it gracefully
        onSubmit(formData);
        return;
      }

      onSubmit(formData);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      {/* 蜜罐字段：对人类隐藏，对机器人可见 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <label htmlFor={fieldName}>Website</label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {children}
    </form>
  );
}
