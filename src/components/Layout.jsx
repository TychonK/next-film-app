import { Inter } from 'next/font/google'

import React from 'react';
import Nav from './header';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children, onDataReceived }) => {
  return (
    <>
      <Nav onDataReceived={onDataReceived}/>
          <main className={`${inter.className}` + " p-12"}>
              {children}
          </main>
      <Footer />
    </>
  );
};

export default Layout;