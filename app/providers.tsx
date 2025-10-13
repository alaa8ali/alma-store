"use client";

import { ReactNode } from "react";
import { Providers as LanguageProviders } from "@/components/providers/providers";

export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProviders>{children}</LanguageProviders>;
}

