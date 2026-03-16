import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Code2, Award, Briefcase, ChevronRight } from 'lucide-react';
import '../css/about.css';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="about" id="about" ref={ref}>
      {/* Background Text Overlay */}
      <div className="about-background-text">ABOUT ME</div>

      {/* Decorative Shapes - Samakan dengan Style Hero */}
      <div className="about-shape shape-1"></div>
      <div className="about-shape shape-2"></div>

      <div className="about-container">
        {/* Konten tetap sama seperti sebelumnya */}
        <div className="about-top-content">
          <div className="about-image" >
            <div className="about-glow"></div>
            <div className="image-frame">
                <img  data-aos="fade-up" data-aos-duration="800"
                  src="alz%20logo/alz.png" 
                  alt="About Allzxxo" 
                  className="about-img-floating" 
                />
            </div>
          </div>

          <div className="about-content">
            <div className="about-badge">
              <Code2 size={14} />
              <span >Full Stack Journey</span>
            </div>
            <h2 className="about-title">
              Crafting Digital <br /> <span>Experiences</span>
            </h2>
                <p className="about-description" data-aos="fade-up" data-aos-duration="800">
            Hi, I am <span className="name-highlight">Aldo Rendy Julian A</span> 
            <span> known as <span className="name-highlight-alt">Allzxxo</span></span>. 
            I am a passionate frontend developer who enjoys building modern, interactive, 
            and user-friendly web interfaces. I love transforming ideas into beautiful 
            digital experiences using modern technologies like <strong>React, JavaScript, and CSS.</strong>
              </p>
            <a href="#projects" className="about-cta">
                Learn More <ChevronRight size={18} />
            </a>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-icon-box">
                <Briefcase className="stat-icon" />
            </div>
            <div className="stat-info">
                <span className="stat-number">
                  {inView && <CountUp end={10} duration={2.5} suffix="+" />}
                </span>
                <span className="stat-label">Projects Completed</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box">
                <Award className="stat-icon" />
            </div>
            <div className="stat-info">
                <span className="stat-number">
                   {inView && <CountUp end={3} duration={2.5} suffix="+" />}
                </span>
                <span className="stat-label">Certificates</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box">
                <Code2 className="stat-icon" />
            </div>
            <div className="stat-info">
                <span className="stat-number">
                  {inView && <CountUp end={1} duration={2.5} suffix="+" />}
                </span>
                <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;