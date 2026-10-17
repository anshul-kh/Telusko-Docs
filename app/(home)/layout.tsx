import { Manrope, JetBrains_Mono } from 'next/font/google';
import './home.css';
import { BfCacheReset } from '@/components/home/BfCacheReset';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-home',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className={`${manrope.variable} ${jetbrainsMono.variable} home-shell`}>
      {children}
      <BfCacheReset />
    </div>
  );
}
