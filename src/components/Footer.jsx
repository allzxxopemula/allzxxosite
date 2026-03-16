import React from 'react';
import { ArrowUp } from 'lucide-react';
import '../css/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo" data-aos="fade-up" data-aos-duration="800">ALLZXXO<span>.</span></h2>
          <p className="footer-tagline" data-aos="fade-up" data-aos-duration="800">
            Student & Frontend Developer based in Indonesia.
          </p>
        </div>

        <div className="footer-right" data-aos="fade-up" data-aos-duration="800">
          <div className="footer-info">
            <p className="copyright">© {currentYear} All rights reserved.</p>
            <p className="made-by">Built with Precision.</p>
          </div>
          <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;