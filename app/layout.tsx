import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers/providers';


export const metadata: Metadata = {
  title: 'alma | متجر إلكتروني مصغر',
  description: 'متجرك الإلكتروني المفضل للمنتجات الاستهلاكية - للطلب والاستفسار: +963983012001',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}