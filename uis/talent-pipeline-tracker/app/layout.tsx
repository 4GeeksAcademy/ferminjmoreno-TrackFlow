import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TrackFlow · Talent Pipeline Tracker',
  description:
    'Sistema centralizado de gestión y seguimiento de candidaturas de TrackFlow Tech (Sede Zaragoza)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
