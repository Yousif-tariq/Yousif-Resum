import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { portfolioData as fallbackData } from './data/portfolioData';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import HeroRealm from './components/HeroRealm';
import SkillsRealm from './components/SkillsRealm';
import ProjectsRealm from './components/ProjectsRealm';
import ExperienceRealm from './components/ExperienceRealm';
import ContactRealm from './components/ContactRealm';
import { Terminal, Shield, Sparkles, ChevronUp, Mail } from 'lucide-react';
import { API_BASE } from './config/api';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('quantum_theme') || 'dark';
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeRealm, setActiveRealm] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [liveData, setLiveData] = useState(fallbackData);

  // Sync theme with HTML root & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quantum_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Fetch Live Data from Django Backend
  useEffect(() => {
    const fetchDjangoData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/portfolio-data/`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.ar && data.en) {
            setLiveData(data);
          }
        }
      } catch (err) {
        console.log('Using cached / fallback portfolio data');
      }
    };

    fetchDjangoData();
  }, []);

  const currentData = liveData[lang] || fallbackData[lang];

  // Initialize Lenis Smooth Scroll & Scroll Depth Listener
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }

      const sections = ['hero', 'skills', 'projects', 'experience', 'contact'];
      const scrollMiddle = window.scrollY + window.innerHeight * 0.4;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < top + height) {
            setActiveRealm(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // Mouse Parallax Listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic document direction when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--color-void)' }}>
      
      {/* 1. Real-time 3D WebGL Canvas Layer (Three.js Depth Engine) */}
      <ThreeCanvas scrollProgress={scrollProgress} mousePos={mousePos} theme={theme} />

      {/* 2. Visual Atmospheric Overlays (Vignette, Grid, Noise) */}
      <div className="depth-overlay" />
      <div className="scanline-grid" />
      <div className="cyber-noise" />

      {/* 3. Navigation Bar & Depth Meter */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        scrollProgress={scrollProgress}
        activeRealm={activeRealm}
      />

      {/* 4. Main Multi-Dimensional Content Realms */}
      <main className="content-wrapper">
        <HeroRealm data={currentData.hero} lang={lang} />
        <SkillsRealm data={currentData.skills} lang={lang} />
        <ProjectsRealm data={currentData.projects} lang={lang} />
        <ExperienceRealm data={currentData.experience} lang={lang} />
        <ContactRealm data={currentData.contact} lang={lang} />
      </main>

      {/* 5. Futuristic Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 20,
          borderTop: '1px solid rgba(168, 85, 247, 0.18)',
          background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(8, 4, 20, 0.95)',
          padding: '3rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-purple)', boxShadow: '0 0 10px var(--neon-purple)' }} />
            <span className="font-cyber" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              {lang === 'ar' ? 'يوسف طارق • مهندس أنظمة وبرمجيات' : 'YOUSIF TARIQ • SYSTEMS & SOFTWARE ENGINEER'}
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {lang === 'ar'
              ? 'تم ربط كامل الموقع بلوحة تحكم Django Admin الحية مع محرك Three.js ثلاثي الأبعاد'
              : 'Powered by dynamic Django Admin CMS & Three.js 3D Depth Engine'}
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '0.5rem' }}>
            <button
              onClick={scrollToTop}
              className="cyber-btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '10px' }}
            >
              <ChevronUp size={16} />
              <span>{lang === 'ar' ? 'العودة لقمة المشهد 🚀' : 'Return to Singularity'}</span>
            </button>
          </div>

          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            © 2026 YOUSIF TARIQ // ALL RIGHTS RESERVED • DJANGO CMS CORE
          </div>

        </div>
      </footer>

    </div>
  );
}
