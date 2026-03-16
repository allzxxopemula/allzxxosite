import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx'; 
import Tech from './components/Tech.jsx';
import Journey from './components/Journey.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Done from './components/Done.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AOS from 'aos'; // 1. Import library AOS
import 'aos/dist/aos.css'; // 2. Import CSS AOS
import './css/App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshGSAP = () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
      AOS.refresh(); // Tambahan: refresh AOS juga saat project bertambah
    }, 100);
  };

  useEffect(() => {
    // Inisialisasi AOS awal
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 50, // Mulai sedikit lebih cepat
    });

    // Timer Loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      // --- ANIMASI MASUK HERO ---
      const introTl = gsap.timeline({
        paused: true,
      });

      introTl.from(".hero-greeting, .hero-role", { 
        x: -100, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power4.out" 
      }, 0)
      .from(".hero-description, .hero-socials", { 
        x: 100, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power4.out" 
      }, 0)
      .from(".hero-visual", { 
        y: 50, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power4.out" 
      }, 0.2)
      .from(".hero-buttons", { 
        y: 30, 
        opacity: 0, 
        duration: 1, 
        ease: "power4.out" 
      }, 0.4);

      if (!isLoading) {
        setTimeout(() => {
          introTl.play();
          // Force refresh AOS setelah intro
          AOS.refresh();
        }, 300);
      }

      // --- SINKRONISASI GSAP & AOS ---
      // Ini kunci utama agar AOS update posisi pixel elemen saat GSAP melakukan Pinning
      ScrollTrigger.addEventListener("refresh", () => AOS.refresh());

      // --- SISA KODE GSAP ---
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-wrapper",
          start: "top -20%", 
          end: "bottom top",    
          scrub: 1,             
        }
      });

      heroTl.to(".hero-greeting, .hero-role", { x: -200, opacity: 0, ease: "none" }, 0)
        .to(".hero-description, .hero-socials", { x: 200, opacity: 0, ease: "none" }, 0)
        .to(".hero-visual", { y: 150, opacity: 0, ease: "none" }, 0)
        .to(".hero-buttons", { y: 150, opacity: 0, ease: "none" }, 0);

      // Gunakan refreshPriority: 1 pada semua elemen yang dipin (pinned)
      ScrollTrigger.create({
        trigger: ".about-wrapper",
        start: "bottom bottom", 
        endTrigger: ".projects-wrapper",
        end: "top top",
        pin: true,
        pinSpacing: false,
        refreshPriority: 1,
      });

      const techStackTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-wrapper",
          start: "bottom bottom", 
          end: "+=100%", 
          pin: true,
          pinSpacing: false,
          scrub: 0.5, 
          refreshPriority: 1,
        }
      });

      const techTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-wrapper",
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          refreshPriority: 1,
        }
      });

      techTl.fromTo(".tech-item", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out" }
      );

      const aboutExitTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-wrapper",
          start: "top bottom", 
          end: "top top",    
          scrub: true,
        }
      });

      aboutExitTl
        .to(".about-title, .about-badge", { y: -150, ease: "none" }, 0)
        .to(".about-background-text", { y: -200, ease: "none" }, 0)
        .to(".about-image", { y: -150, ease: "none" }, 0)
        .to(".about-stats", { y: -150, ease: "none" }, 0)
        .to(".about-cta", { y: -50, opacity: 0, ease: "none" }, 0);

      gsap.utils.toArray(".project-item").forEach((item) => {
        const number = item.querySelector(".project-number");
        const title = item.querySelector(".project-title");
        const desc = item.querySelector(".project-desc");
        const tags = item.querySelector(".project-tags");
        const viewLink = item.querySelector(".view-project");
        const img = item.querySelector("img");

        const projectTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%", 
            end: "bottom 15%",   
            scrub: 1.5,            
          }
        });

        projectTl
          .fromTo(number, { y: 60 }, { y: -120, ease: "none" }, 0)
          .fromTo(title, { y: 50 }, { y: -100, ease: "none" }, 0)
          .fromTo(desc, { y: 40 }, { y: -90, ease: "none" }, 0)
          .fromTo(tags, { y: 30 }, { y: -80, ease: "none" }, 0)
          .fromTo(viewLink, { y: 20 }, { y: -70, ease: "none" }, 0)
          .fromTo(img, { scale: 1 }, { scale: 1, ease: "none" }, 0);
      });

      // Lakukan refresh terakhir setelah semua timeline terdaftar
      ScrollTrigger.refresh();
    });

    ScrollTrigger.create({
      trigger: ".about-description",
      start: "top 85%",
      onEnter: () => document.querySelector(".about").classList.add("is-visible"),
      onLeaveBack: () => document.querySelector(".about").classList.remove("is-visible"),
    });

    gsap.set(".progress-line", { scaleY: 0, transformOrigin: "top" });

    gsap.to(".progress-line", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".journey-timeline",
        start: "top center", 
        end: "bottom center",
        scrub: 1,
        refreshPriority: -1,
        invalidateOnRefresh: true,
      }
    });

    mm.add("(min-width: 1px)", () => {
      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".journey-wrapper",
          start: "bottom 95%", 
          end: "bottom -20%",
          scrub: 1,
        }
      });

      journeyTl.to(".j-bar", {
        scaleY: 1,
        stagger: { each: 0.15, from: "start", ease: "none" },
        duration: 1, 
        ease: "power2.out"
      }, 0);

      ScrollTrigger.create({
        trigger: ".done-wrapper",
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        refreshPriority: -1,
      });

    });

    return () => {
      mm.revert();
      clearTimeout(timer);
      // Bersihkan event listener
      ScrollTrigger.removeEventListener("refresh", () => AOS.refresh());
    };
  }, [isLoading]);

  return (
    <>
      <div className={`intro-loader ${isLoading ? '' : 'exit'}`}>
        <div className="intro-text">
          <span className="text-white">ALLZ</span>
          <span className="text-blue">XXO</span>
        </div>
      </div>
      <div className={`App ${!isLoading ? 'loaded' : ''}`} ref={containerRef}>
        <Navbar />
        <div className="hero-wrapper"><Hero /></div>
        <div className="about-wrapper"><About /></div>
        <div className="projects-wrapper"><Projects onShowMore={refreshGSAP} /></div>
        <div className="tech-wrapper"><Tech /></div>
        <div className="journey-wrapper"><Journey /></div>
        <div className="music-wrapper"><MusicPlayer /></div>
        <div className="done-wrapper"><Done /></div>
        <div className="contact-wrapper"><Contact /></div>
        <div className="footer-wrapper"><Footer /></div>
      </div>
    </>
  );
}

export default App;