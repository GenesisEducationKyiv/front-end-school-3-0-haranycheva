import { PropsWithChildren } from 'react';
import './globals.css';
import { MyQueryProvider } from '@/components/widgets/MyQueryProvider';

export const metadata = {
  title: 'Music Tracks',
  description: 'An app for managing music tracks',
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <MyQueryProvider>
        <body className={``}>
          <main>{children}</main>
        </body>
      </MyQueryProvider>
    </html>
  );
}
