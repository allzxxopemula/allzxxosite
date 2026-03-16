import React from 'react';
import { 
  FaReact, 
  FaPython, 
  FaPhp, 
  FaGitAlt, 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare,
  FaGithub, // Logo GitHub yang stabil
  FaCode,   // Representatif untuk VS Code
  FaRobot   // Representatif untuk ChatGPT
} from 'react-icons/fa'; 
import { SiTailwindcss, SiGooglegemini } from 'react-icons/si'; 
import '../css/tech.css';

const Tech = () => {
  const techData = [
    { id: "01", name: "HTML5", category: "Structure", icon: <FaHtml5 /> },
    { id: "02", name: "CSS3", category: "Styling", icon: <FaCss3Alt /> },
    { id: "03", name: "JavaScript", category: "Logic", icon: <FaJsSquare /> },
    { id: "04", name: "React", category: "Library", icon: <FaReact /> },
    { id: "05", name: "Tailwind", category: "Framework", icon: <SiTailwindcss /> },
    { id: "06", name: "Python", category: "Language", icon: <FaPython /> },
    { id: "07", name: "PHP", category: "Language", icon: <FaPhp /> },
    { id: "08", name: "Git", category: "Version Control", icon: <FaGitAlt /> },
    { id: "09", name: "Gemini", category: "AI Assistant", icon: <SiGooglegemini /> },
    { id: "10", name: "ChatGPT", category: "AI Assistant", icon: <FaRobot /> },
    { id: "11", name: "VS Code", category: "Environment", icon: <FaCode /> },
    { id: "12", name: "GitHub", category: "Platform", icon: <FaGithub /> },
  ];

  return (
    <section className="tech" id="tech">
      <div className="tech-container">
        {/* Bagian Kiri */}
        <div className="tech-left">
          <h2 className="tech-title">
            MY <br /> <span className="stroke-text">TOOLS</span>
          </h2>
          <p className="tech-desc">
            "A collection of technologies and tools I learn and use to build digital projects."
          </p>
        </div>

        {/* Bagian Kanan */}
        <div className="tech-right">
          <div className="tech-bg-text">SKILLS</div>
          <div className="tech-grid">
            {techData.map((item) => (
              <div className="tech-item" key={item.id}>
                <div className="tech-item-header">
                  <span className="tech-id">{item.id}</span>
                  <span className="tech-icon">{item.icon}</span>
                </div>
                <div className="tech-item-body">
                  <h3 className="tech-name">{item.name}</h3>
                  <p className="tech-cat">{item.category}</p>
                </div>
              </div>
            ))}
            
          </div>
          
        </div>
        
      </div>
      
<div className="tech-wave-container">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--bg-accent)" fillOpacity="1" d="M0,224L120,234.7C240,245,480,267,720,272C960,277,1200,267,1320,261.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      </div>

    </section>
    


  );
};

export default Tech;