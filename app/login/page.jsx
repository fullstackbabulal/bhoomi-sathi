// ======================================================
// File: app/login/page.jsx
// Description: Login Page (App Router)
// Clean page shell for LoginForm
// ======================================================

import LoginForm from "@/components/login/LoginForm";

// ======================================================
// SEO METADATA
// ======================================================
export const metadata = {
  title: "Login | Plot in Patna",
  description:
    "Login to your Plot in Patna account to manage properties, saved listings, and profile settings.",
};

// ======================================================
// LOGIN PAGE
// ======================================================
export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
