"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Providers as LanguageProviders } from "@/components/providers/providers";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProviders>{children}</LanguageProviders>
    </SessionProvider>
  );
}

