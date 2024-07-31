// client/src/app/layout.tsx
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';

export const metadata = {
  title: 'Real-Time Price Data',
  description: 'Fetch and display real-time price data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
