import React from 'react';
import { FaMapMarkerAlt, FaSchool } from 'react-icons/fa';
import '../css/Journey.css';

const Journey = () => {
  const journeys = [
    { 
      year: "2025 — CURRENT", 
      title: "SOFTWARE ENGINEERING STUDENT", 
      location: "SMK Muhammadiyah 1 Nganjuk",
      city: "Nganjuk, Indonesia",
      desc: "Building a strong foundation in software engineering, logic programming, and mastering basic web development structures.",
      tags: ["RPL", "Algorithm", "Web Dev"]
    },
    { 
      year: "2025 - PAUSED", 
      title: "CONTENT CREATOR", 
      location: "YouTube & TikTok",
      city: "Indonesia",
      desc: "Developing engaging Minecraft-related video content for TikTok and YouTube, focusing on visual storytelling and audience engagement.",
      tags: ["Video Editing", "Minecraft", "Creative"]
    },
    { 
      year: "ACTIVE", 
      title: "BEGINNER FRONTEND DEV", 
      location: "Independent Learning",
      city: "Indonesia",
      desc: "Deep diving into the React.js ecosystem, modern CSS frameworks, and advanced animation libraries like GSAP for high-performance web experiences.",
      tags: ["React", "GSAP", "Tailwind"]
    }
  ];

  // Komponen Cloud untuk render berulang biar hemat baris
  const CloudRender = ({ className }) => (
    <div className={`cloud-group ${className}`}>
      <div className="c-bulat c1"></div>
      <div className="c-bulat c2"></div>
      <div className="c-bulat c3"></div>
      <div className="c-bulat c4"></div>
      <div className="c-bulat c5"></div>
    </div>
  );

  return (
    <section className="journey">
      {/* --- BACKGROUND AWAN BANYAK --- */}
      <div className="cloud-wrapper">
        <CloudRender className="pos-1" />
        <CloudRender className="pos-2" />
        <CloudRender className="pos-3" />
        <CloudRender className="pos-4" />
        <CloudRender className="pos-5" />
      </div>

      <div className="journey-container">
        <h2 className="journey-label">ME NOW</h2>
        
        <div className="journey-timeline">
          <div className="center-line"></div>
          <div className="progress-line"></div>

          {journeys.map((item, index) => (
            <div 
              key={index} 
              className={`journey-row ${index % 2 !== 0 ? 'right' : 'left'}`}
            >
              <div className="journey-dot">
                <div className="dot-inner"></div>
              </div>

              <div className="journey-card" data-aos="fade-up" data-aos-duration="800">
                <div className="card-top">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-year">{item.year}</span>
                </div>

                <div className="card-info">
                  <div className="info-item">
                    <FaSchool className="info-icon" />
                    <span>{item.location}</span>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{item.city}</span>
                  </div>
                </div>

                <p className="card-desc">{item.desc}</p>
                
                <div className="card-tags">
                  {item.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
<div className="journey-bars-overlay">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="j-bar"></div>
    ))}
  </div>
      
    </section>
  );
};

export default Journey;