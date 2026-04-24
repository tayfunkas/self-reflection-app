// app/password-change/password-change-success-redirect.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PasswordChangeSuccessRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/profile");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [router]);

  return null;
}