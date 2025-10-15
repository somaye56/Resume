import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google'
import iranSans from '@/fonts/iransans'
import { ToastContainer } from "react-toastify";


import Header from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
import cn from '@/utils/clsxFun';
import Footer from "@/components/layout/Footer";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    // console.error(`Locale ${locale} not found`);
    notFound();
  }

  const messages = await getMessages({ locale });


  return (
    <html lang={locale} dir={locale === "fa" ? "ltr" : "rtl"}>
      <head>

      </head>
      <body className={cn(
        `bg-gradient-to-br min-h-screen text-muted  from-[#D6A99D] via-[#FFF2EF] to-[#ADB2D4]  ${locale === "en" ? inter.className : iranSans.className}`
      )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main className=" max-w-6xl mx-auto p-4">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}