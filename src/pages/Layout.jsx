import { Inter } from 'next/font/google'

import React from 'react';
import Nav from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {
  const router = useRouter()
  const path = router.asPath

  return (
    <>
      <Nav />
      <main className={`${inter.className}` + `${path.includes('/films/') ||  path.includes('/people/') ? " bg-gray-900" : ""}` + " p-12 pl-16 pr-16"}>
              {children}
          </main>
      <Footer />
    </>
  );
};

export default Layout;