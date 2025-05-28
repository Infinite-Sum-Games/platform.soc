import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Toaster } from './components/ui/toaster';

const gilroy = localFont({
  src: [
    {
      path: 'fonts/Gilroy-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-Heavy.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-HeavyItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-RegularItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: 'fonts/Gilroy-UltraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'fonts/Gilroy-UltraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SoC | ACM Amrita',
  description: 'Leaderboard for Summer of Code',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="fallbackImage.jpg"
          type="image/jpeg"
        />
      </head>

      <body className={`${gilroy.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
