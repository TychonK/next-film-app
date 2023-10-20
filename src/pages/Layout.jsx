import { Inter } from 'next/font/google'

import React from 'react';
import Nav from '../components/header';
import Footer from '../components/footer';

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
          <main className={`${inter.className}` + " p-12 pl-16 pr-16"}>
              {children}
          </main>
      <Footer />
    </>
  );
};

export default Layout;