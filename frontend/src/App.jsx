import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { portfolioData as fallbackData } from './data/portfolioData';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import HeroRealm from './components/HeroRealm';
import SkillsRealm from './components/SkillsRealm';
import ProjectsRealm from './components/ProjectsRealm';
import ExperienceRealm from './components/ExperienceRealm';
import ContactRealm from './components/ContactRealm';
import { ChevronUp } from 'lucide-react';
import { API_BASE } from './config/api';
import { recordVisit } from './services/tracker';

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('preferred_lang') || 'en';
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('quantum_theme') || 'dark';
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeRealm, setActiveRealm] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [liveData, setLiveData] = useState(fallbackData);

  // Asynchronously record device visit in backend
  useEffect(() => {
    recordVisit(lang, window.location.pathname || '/');
  }, []);

  // Sync theme with HTML root & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quantum_theme', theme);
  }, [theme]);

  // Sync language preference
  useEffect(() => {
    localStorage.setItem('preferred_lang', lang);
  }, [lang]);

  // Seamless Background Audio Autoplay (No UI buttons, runs on open or first interaction)
  useEffect(() => {
    const audio = new Audio('/audio/run_mus.mp3');
    audio.loop = true;
    audio.volume = 0.65;

    let isStarted = false;
    const startAudio = () => {
      if (isStarted) return;
      audio.play().then(() => {
        isStarted = true;
        cleanupListeners();
      }).catch(() => {
        // Autoplay policy prevented immediate playback; waiting for first user interaction
      });
    };

    const handleUserGesture = () => {
      startAudio();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('scroll', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
    };

    // 1. Try immediate playback on app launch
    startAudio();

    // 2. Fallback on first gesture if blocked by browser policy
    window.addEventListener('click', handleUserGesture, { passive: true });
    window.addEventListener('touchstart', handleUserGesture, { passive: true });
    window.addEventListener('pointerdown', handleUserGesture, { passive: true });
    window.addEventListener('scroll', handleUserGesture, { passive: true });
    window.addEventListener('keydown', handleUserGesture, { passive: true });

    return () => {
      cleanupListeners();
      audio.pause();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Fetch Live Data from Django Backend with auto-retry
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const fetchDjangoData = async () => {
      try {
        if (!API_BASE) return;
        const url = `${API_BASE}/api/portfolio-data/?_t=${Date.now()}`;
        const res = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data && data.ar && data.en && isMounted) {
            setLiveData(data);
            return;
          }
        }
      } catch (err) {}

      if (isMounted && retryCount < maxRetries && API_BASE) {
        retryCount++;
        setTimeout(fetchDjangoData, 3500);
      }
    };

    fetchDjangoData();
    return () => { isMounted = false; };
  }, []);

  const currentData = liveData[lang] || fallbackData[lang];

  // Initialize Smooth Scrolling (Configured for ultra responsiveness on touch & desktop)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    // On mobile devices, we use native lightweight touch scrolling or low duration Lenis
    const lenis = new Lenis({
      duration: isMobile ? 0.7 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.0
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    let tick = false;
    const handleScroll = () => {
      if (!tick) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
            setScrollProgress(progress);
          }

          const sections = ['hero', 'skills', 'projects', 'experience', 'contact'];
          const scrollMiddle = window.scrollY + window.innerHeight * 0.35;

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
          tick = false;
        });
        tick = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // Throttled Mouse Parallax Listener
  useEffect(() => {
    let mouseTick = false;
    const handleMouseMove = (e) => {
      if (!mouseTick) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          setMousePos({ x, y });
          mouseTick = false;
        });
        mouseTick = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Direction sync
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', minHeight: '100dvh', background: 'var(--color-void)' }}>
      
      {/* 1. Real-time Minimalist Luxury 3D Starfield & Particle Nebula Layer */}
      <ThreeCanvas scrollProgress={scrollProgress} mousePos={mousePos} theme={theme} />

      {/* 2. Pure Atmospheric Depth Vignette */}
      <div className="depth-overlay" />

      {/* 3. Navigation Bar */}
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

      {/* 5. Clean Cyber Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 20,
          borderTop: '1px solid rgba(168, 85, 247, 0.2)',
          background: theme === 'light' ? 'rgba(255, 255, 255, 0.96)' : 'rgba(5, 2, 12, 0.96)',
          padding: 'clamp(2rem, 4vw, 3rem) 1.5rem 2.5rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-purple)', boxShadow: '0 0 10px var(--neon-purple)' }} />
            <span className="font-cyber" style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {lang === 'ar' ? 'يوسف طارق • مهندس أنظمة وبرمجيات' : 'YOUSIF TARIQ • SYSTEMS & SOFTWARE ENGINEER'}
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.8rem, 1.6vw, 0.88rem)', maxWidth: '36rem', lineHeight: 1.6 }}>
            {lang === 'ar'
              ? 'معمارية شبكات وأنظمة برمجية سحابية عالية الأداء مع محرك أعصاب سيبراني ثلاثي الأبعاد'
              : 'High-performance distributed systems architecture & 3D Cyber Neural Matrix engine'}
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '0.25rem' }}>
            <button
              onClick={scrollToTop}
              className="cyber-btn-secondary"
              style={{ padding: '7px 16px', fontSize: '0.82rem', borderRadius: '10px' }}
            >
              <ChevronUp size={15} />
              <span>{lang === 'ar' ? 'العودة لقمة المشهد 🚀' : 'Return to Singularity'}</span>
            </button>
          </div>

          <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            © 2026 YOUSIF TARIQ // ALL SYSTEMS OPERATIONAL
          </div>

        </div>
      </footer>

    </div>
  );
}
