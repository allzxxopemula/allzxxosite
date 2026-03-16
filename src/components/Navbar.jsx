import React, { useState, useEffect, useRef } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import gsap from 'gsap';
import '../css/navbar.css';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = navbarRef.current;

      // --- TAMBAHAN: LOGIKA AUTO-CLOSE NAVBAR SAAT SCROLL ---
      // Jika menu mobile sedang terbuka dan ada aktivitas scroll, langsung tutup.
      if (isMobile) {
        setIsMobile(false);
      }
      // -----------------------------------------------------

      // 1. Animasi Show/Hide saat Scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scroll ke bawah: Sembunyikan
        gsap.to(navbar, { yPercent: -150, duration: 0.3, ease: "power2.inOut" });
      } else {
        // Scroll ke atas: Tampilkan
        gsap.to(navbar, { yPercent: 0, duration: 0.3, ease: "power2.out" });
      }

      // 2. Efek Glassmorphism saat tidak di paling atas
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Inisialisasi tema saat pertama kali load
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') setIsDark(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]); // Tambahkan isMobile di sini agar handleScroll tahu status menu terbaru

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech', href: '#tech' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#home">ALLZXXO</a>
        </div>

        <div className="nav-actions-wrapper">
          <div className={`nav-overlay ${isMobile ? 'active' : ''}`} onClick={() => setIsMobile(false)}></div>
          
          <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setIsMobile(false)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
            <button className="hamburger" onClick={() => setIsMobile(!isMobile)} aria-label="Menu">
              {isMobile ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;