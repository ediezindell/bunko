import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '文庫サーチ',
  description: 'Next.js App router',
};

const Header = () => {
  return (
    <header>
      <nav>
        <menu>
          <li>
            <Link href="/">トップ</Link>
          </li>
          {/* <li> */}
          {/*   <Link href="/books">ブック</Link> */}
          {/* </li> */}
        </menu>
      </nav>
    </header>
  );
};

const Footer = () => {
  return <footer>{/* footer */}</footer>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="dark">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
