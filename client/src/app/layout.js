import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MouseEffect from '@/components/MouseEffect';
import './globals.css';

export const metadata = {
  title: 'Orbital Net | High Speed Internet & Tech Store',
  description: 'Manage your internet packages and hardware products with Orbital Net.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Ekhane Zinc background ar Orange selection color dewa hoyeche */}
      <body className="bg-zinc-950 min-h-screen flex flex-col font-sans antialiased text-zinc-100 cursor-default selection:bg-orange-500/30">
        
        <MouseEffect />

        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </SmoothScroll>
        <Footer/>
      </body>
    </html>
  );
}