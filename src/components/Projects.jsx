import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ onShowMore }) => { // Tambahkan props onShowMore agar bisa refresh dari App.js
  const projectData = [
    { id: "01", title: "Portofolio", desc: "A personal portfolio website designed with a clean and modern aesthetic.", tags: ["HTML", "CSS", "JAVASCRIPT"], link: "https://allzxxopemula.github.io/AllzxxoWeb/", img: "imgproject/porto.jpg" },
    { id: "02", title: "Class Web", desc: "A collaborative classroom website featuring student profiles.", tags: ["REACT", "JAVASCRIPT", "GSAP"], link: "https://allzxxopemula.github.io/x-rpl/", img: "imgproject/kelas.jpg" },
    { id: "03", title: "Allzxxo Ai", desc: "An intuitive web assistant providing smart, real-time answers and fluid dialogue within a distraction-free environment.", tags: ["HTML", "CSS", "JAVASCRIPT"], link: "https://alzai-delta.vercel.app/", img: "imgproject/ai.jpg" },
    { id: "04", title: "Next Project", desc: "Coming soon project to fill the space.", tags: ["REACT", "TAILWIND"], link: "#", img: "imgproject/1.jpg" },
    { id: "05", title: "Final Project", desc: "The last project in this list.", tags: ["NODE JS", "DATABASE"], link: "#", img: "imgproject/1.jpg" }
  ];

  const [visibleProjects, setVisibleProjects] = useState(3);

  useEffect(() => {
    // 1. Bersihkan trigger lama khusus untuk project-item agar tidak tumpang tindih
    const allTriggers = ScrollTrigger.getAll();
    allTriggers.forEach(t => {
      if (t.trigger && t.trigger.classList.contains('project-item')) {
        t.kill();
      }
    });

    // 2. Inisialisasi ulang animasi untuk SEMUA elemen yang terlihat
    gsap.utils.toArray(".project-item").forEach((item) => {
      const number = item.querySelector(".project-number");
      const title = item.querySelector(".project-title");
      const desc = item.querySelector(".project-desc");   // <--- Perbaikan: Tambahkan desc
      const tags = item.querySelector(".project-tags");   // <--- Perbaikan: Tambahkan tags
      const link = item.querySelector(".view-project");   // <--- Perbaikan: Tambahkan link
      const img = item.querySelector("img");

      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Gunakan 1.5 agar lebih smooth dan sinkron dengan App.js
        }
      })
      .to(number, { y: -120, ease: "none" }, 0)
      .to(title, { y: -100, ease: "none" }, 0)
      .to(desc, { y: -90, ease: "none" }, 0)   // <--- Perbaikan: Daftarkan animasi
      .to(tags, { y: -80, ease: "none" }, 0)   // <--- Perbaikan: Daftarkan animasi
      .to(link, { y: -70, ease: "none" }, 0)   // <--- Perbaikan: Daftarkan animasi
      .to(img, { y: -20, ease: "none" }, 0);
    });

    // 3. Refresh GSAP agar menghitung ulang posisi setelah DOM berubah
    ScrollTrigger.refresh();
  }, [visibleProjects]);

  const showMore = () => {
    setVisibleProjects(5);
    // Panggil fungsi refresh dari props jika ada
    if (onShowMore) {
      setTimeout(() => {
        onShowMore();
      }, 100);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-badge">MY WORK</span>
          <h2 className="projects-main-title">PROJECTS</h2>
        </div>

        <div className="projects-list">
          {projectData.slice(0, visibleProjects).map((project, index) => (
            <div className="project-item" key={project.id}>
              <div className="project-info">
                <span className="project-number">{project.id}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="view-project">
                  VIEW PROJECT <ExternalLink size={16} />
                </a>
              </div>
              
              <div className="project-visual">
                <div className="project-img-wrapper">
                  <img src={project.img} alt={project.title} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < projectData.length && (
          <div className="view-more-container">
            <button className="view-more-btn" onClick={showMore}>
              VIEW MORE PROJECTS <ChevronDown size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;