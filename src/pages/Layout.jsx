import { Inter } from 'next/font/google'

import React, { useState } from 'react';
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
    const htmlElement = document.documentElement

    htmlElement.style.overflow = "visible" 
    
    setMobileOpen(data)
  }

  const toggle = () => {
    const htmlElement = document.documentElement
  
    if (mobileOpen) {
    console.log("set visible")
    htmlElement.style.overflow = "visible"
    } else {
      console.log("set hidden")
    htmlElement.style.overflow = "hidden"
    }
    
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={'overflow-x-hidden'}>
      <Nav toggleMenu={toggle} closeMenu={closeMenu} menuState={ mobileOpen } />
      <NavMobile close={closeMenu} open={mobileOpen} />
      
      <main
        className={`${inter.className}` + `${path.includes('/movie/') || path.includes('/tv/') || path.includes('/people/') || path.includes('/gallery/') ? " bg-gray-900" : ""}` + " " + "py-8 md:py-12 px-4 sm:px-8 md:px-12 lg:px-16"}
        
      >
              {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;