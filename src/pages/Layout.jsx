import { Inter } from 'next/font/google'

import React, {useState} from 'react';
import Nav from '../components/header';
import Footer from '../components/footer';
import NavMobile from '@/components/NavMobile';

import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {
  const router = useRouter()
  const path = router.asPath

  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMenu = (data) => {
    setMobileOpen(data)
  }

  const toggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={'overflow-x-hidden' + " " + `${mobileOpen && "overflow-y-hidden"}`}>
      <Nav toggleMenu={ toggle }/>
      <NavMobile  close={ closeMenu } open={mobileOpen} />
      <main
        className={`${inter.className}` + `${path.includes('/movie/') || path.includes('/tv/') || path.includes('/people/') || path.includes('/gallery/') ? " bg-gray-900" : ""}` + " py-12 px-4 sm:px-8 md:px-12 lg:px-16"}
        
      >
              {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;