import React, { useState, useEffect } from 'react';
import { Terminal, Globe, Menu, X, Radio, Layers, Cpu, Code2, Send, Sun, Moon } from 'lucide-react';
import AudioController from './AudioController';

export default function Navbar({ lang, setLang, theme, toggleTheme, scrollProgress, activeRealm }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const depthMeters = Math.round(scrollProgress * 4500);

  const realms = [
    { id: 'hero', nameAr: 'نقطة الانطلاق', nameEn: 'Singularity', icon: Radio },
    { id: 'skills', nameAr: 'معمارية النظم', nameEn: 'Architecture', icon: Cpu },
    { id: 'projects', nameAr: 'المشاريع الكبرى', nameEn: 'Multiverse', icon: Code2 },
    { id: 'experience', nameAr: 'المسيرة', nameEn: 'Timeline', icon: Layers },
    { id: 'contact', nameAr: 'مركز الإشارة', nameEn: 'Signal Nexus', icon: Send }
  ];

  const scrollToRealm = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0.85rem 2rem',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
        background: isScrolled
          ? (theme === 'light' ? 'rgba(255, 255, 255, 0.88)' : 'rgba(8, 4, 20, 0.88)')
          : (theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(8, 4, 20, 0.45)'),
        borderBottom: `1px solid ${isScrolled ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.08)'}`,
        transition: 'all 0.4s ease'
      }}
    >
      <div style={{ maxWidth: '85rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand / Logo */}
        <div
          onClick={() => scrollToRealm('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-magenta))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--glow-purple)',
              color: '#ffffff'
            }}
          >
            <Terminal size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-cyber" style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
              {lang === 'ar' ? 'يوسف طارق' : 'YOUSIF TARIQ'}
            </div>
            <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--neon-purple)', fontWeight: 600 }}>
              SYS_ARCH // ENG.v26
            </div>
          </div>
        </div>

        {/* Real-Time Depth HUD Indicator (Desktop) */}
        <div
          className="font-mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            fontSize: '0.8rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--neon-purple)',
                boxShadow: '0 0 10px var(--neon-purple)',
                animation: 'cyber-pulse 1.5s infinite'
              }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>
              {lang === 'ar' ? 'العمق البصري:' : 'DIVE DEPTH:'}
            </span>
            <span style={{ color: 'var(--neon-purple)', fontWeight: 700 }}>
              {depthMeters} m
            </span>
          </div>
        </div>

        {/* Realm Navigation Links (Desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav-links">
          {realms.map((realm) => {
            const Icon = realm.icon;
            const isActive = activeRealm === realm.id;
            return (
              <button
                key={realm.id}
                onClick={() => scrollToRealm(realm.id)}
                style={{
                  background: isActive ? 'rgba(168, 85, 247, 0.16)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(168, 85, 247, 0.45)' : 'transparent'}`,
                  color: isActive ? 'var(--neon-purple)' : 'var(--text-secondary)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.25s ease'
                }}
              >
                <Icon size={15} />
                <span>{lang === 'ar' ? realm.nameAr : realm.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Controls: Theme Toggle + Audio + Language Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Professional Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="cyber-btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.82rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title={theme === 'dark' ? 'تبديل للمظهر الفاتح (Light Mode)' : 'تبديل للمظهر الداكن (Dark Mode)'}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={16} style={{ color: '#f59e0b', filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>فاتح</span>
              </>
            ) : (
              <>
                <Moon size={16} style={{ color: 'var(--neon-purple)', filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>داكن</span>
              </>
            )}
          </button>

          <AudioController />

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="cyber-btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Globe size={15} style={{ color: 'var(--neon-purple)' }} />
            <span style={{ fontWeight: 700 }}>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cyber-btn-secondary"
            style={{ display: 'none', padding: '8px' }}
            id="mobileMenuToggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(8, 4, 20, 0.98)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {realms.map((realm) => {
            const Icon = realm.icon;
            return (
              <button
                key={realm.id}
                onClick={() => scrollToRealm(realm.id)}
                style={{
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.15)',
                  color: 'var(--text-primary)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: lang === 'ar' ? 'right' : 'left'
                }}
              >
                <Icon size={18} style={{ color: 'var(--neon-purple)' }} />
                <span>{lang === 'ar' ? realm.nameAr : realm.nameEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
