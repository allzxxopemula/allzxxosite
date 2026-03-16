import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Youtube, Instagram, Github } from 'lucide-react'; 
import '../css/hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* Background Decorative Shapes */}
      <div className="hero-shape shape-1"></div>
      <div className="hero-shape shape-2"></div>

      <div className="hero-container" >
        {/* Konten Teks */}
        <div className="hero-content">
          <p className="hero-greeting">
            Hello, I am <span className="highlight" >Allzxxo</span>
          </p>
          
          <h1 className="hero-role">
            <span className="typewriter-text">
              <Typewriter
                words={['Frontend Developer', 'UI/UX Designer', 'Creative Coder']}
                loop={0}
                cursor={false} // Matikan kursor bawaan agar tidak transparan
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
            {/* Kursor Manual yang tidak terkena efek gradient */}
            <span className="custom-cursor">|</span>
          </h1>

          <p className="hero-description">
            A passionate frontend developer who loves creating modern, interactive, 
            and beautiful web interfaces with clean code and smooth user experiences.
          </p>

          <div className="hero-socials">
            <a href="https://www.youtube.com/@allzxxo" className="social-link"><Youtube size={20} /></a>
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            <a href="#" className="social-link"><Github size={20} /></a>
          </div>

          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#tech" className="btn-secondary">My Skills</a>
          </div>
        </div>

        {/* Visual Image */}
        <div className="hero-visual">
          <div className="hero-glow"></div>
          <div className="hero-img-wrapper">
            <img 
              src="alz%20logo/alz.png" 
              alt="Developer Illustration" 
              className="hero-img"
            />
            <div className="hero-glass-card">
              <span>Code is Art</span>
            </div>
            <div className="hero-glass-card-2">
              <span>Design & Logic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;