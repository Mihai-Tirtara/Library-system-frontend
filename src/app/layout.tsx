import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '../components/Navigation'
import "./globals.css";

// Load Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata: Metadata = {
  title: 'Library Management System',
  description: 'A modern library management system with AI-powered insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation component at the top of every page */}
        <Navigation />

        {/* Main content area with consistent padding and max width */}
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>

        {/* Footer could be added here if needed */}
      </body>
    </html>
  );
}
