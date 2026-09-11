import React, { useState, useEffect } from 'react';
import { Terminal, Globe, Menu, X, Radio, Layers, Cpu, Code2, Send, Sun, Moon, Sparkles, Activity, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ lang, setLang, theme, toggleTheme, scrollProgress, activeRealm, isAudioPlaying, toggleAudio }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    <>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          padding: '0.65rem 1rem',
          paddingTop: 'max(0.65rem, var(--sat))',
          paddingLeft: 'max(1rem, var(--sal))',
          paddingRight: 'max(1rem, var(--sar))',
          background: isScrolled
            ? (theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(7, 3, 16, 0.94)')
            : (theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(7, 3, 16, 0.65)'),
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${isScrolled ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.12)'}`,
          transition: 'background 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ maxWidth: '85rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          
          {/* Brand / Logo */}
          <div
            onClick={() => scrollToRealm('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-magenta))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.4)',
                color: '#ffffff',
                flexShrink: 0
              }}
            >
              <Terminal size={19} strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-cyber" style={{ fontWeight: 800, fontSize: '0.94rem', letterSpacing: '0.03em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {lang === 'ar' ? 'يوسف طارق' : 'YOUSIF TARIQ'}
              </div>
              <div className="font-mono" style={{ fontSize: '0.64rem', color: 'var(--neon-purple)', fontWeight: 700 }}>
                SYS_ARCH // ENG.v26
              </div>
            </div>
          </div>

          {/* Real-Time Depth HUD Indicator (Desktop) */}
          <div
            id="depth-hud-indicator"
            className="font-mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 14px',
              borderRadius: '999px',
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              fontSize: '0.78rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--neon-purple)',
                  boxShadow: '0 0 10px var(--neon-purple)',
                  animation: 'cyber-pulse 1.5s infinite'
                }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? 'العمق الشبكي:' : 'CYBER DEPTH:'}
              </span>
              <span style={{ color: 'var(--neon-purple)', fontWeight: 700 }}>
                {depthMeters} m
              </span>
            </div>
          </div>

          {/* Realm Navigation Links (Desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav-links">
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
                    padding: '7px 12px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={14} />
                  <span>{lang === 'ar' ? realm.nameAr : realm.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Controls: Audio + Theme Switcher + Language Toggle + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            
            {/* Audio Toggle Button */}
            {toggleAudio && (
              <button
                onClick={toggleAudio}
                className="cyber-btn-secondary"
                style={{
                  padding: '6px 9px',
                  fontSize: '0.8rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '38px',
                  minWidth: '38px',
                  borderColor: isAudioPlaying ? 'var(--neon-purple)' : 'var(--color-border)',
                  background: isAudioPlaying ? 'rgba(168, 85, 247, 0.15)' : 'var(--color-surface)'
                }}
                title={isAudioPlaying ? (lang === 'ar' ? 'كتم الصوت التفاعلي' : 'Mute Ambient Audio') : (lang === 'ar' ? 'تشغيل الصوت التفاعلي' : 'Play Ambient Audio')}
                aria-label="التحكم بالصوت المحيطي"
              >
                {isAudioPlaying ? (
                  <Volume2 size={16} style={{ color: 'var(--neon-purple)', filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))' }} />
                ) : (
                  <VolumeX size={16} style={{ color: 'var(--text-muted)' }} />
                )}
              </button>
            )}

            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="cyber-btn-secondary"
              style={{
                padding: '6px 9px',
                fontSize: '0.8rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '38px',
                minWidth: '38px'
              }}
              title={theme === 'dark' ? 'تبديل للمظهر الفاتح' : 'تبديل للمظهر الداكن'}
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? (
                <Sun size={16} style={{ color: '#f59e0b', filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))' }} />
              ) : (
                <Moon size={16} style={{ color: 'var(--neon-purple)', filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))' }} />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="cyber-btn-secondary"
              style={{
                padding: '6px 11px',
                fontSize: '0.82rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                minHeight: '38px'
              }}
              title="تغيير لغة العرض"
              aria-label="تغيير لغة العرض"
            >
              <Globe size={15} style={{ color: 'var(--neon-purple)' }} />
              <span style={{ fontWeight: 800 }}>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cyber-btn-secondary"
              style={{
                display: 'none',
                padding: '6px 8px',
                borderRadius: '10px',
                minHeight: '38px',
                minWidth: '38px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              id="mobileMenuToggle"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X size={20} style={{ color: 'var(--neon-magenta)' }} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </nav>

      {/* Cyberpunk Mobile Full-Screen Command Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 75,
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(5, 2, 12, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'calc(var(--sat) + 4.5rem)',
            paddingBottom: 'max(1.5rem, var(--sab))',
            paddingLeft: 'max(1rem, var(--sal))',
            paddingRight: 'max(1rem, var(--sar))',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            animation: 'fadeInMenu 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div>
            {/* Depth Status on Mobile */}
            <div
              className="glass-panel"
              style={{
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                borderColor: 'rgba(168, 85, 247, 0.35)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)' }} />
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {lang === 'ar' ? 'العمق السيبراني' : 'CYBER MATRIX DEPTH'}
                </span>
              </div>
              <span className="font-mono" style={{ color: 'var(--neon-purple)', fontWeight: 800, fontSize: '0.85rem' }}>
                {depthMeters} m
              </span>
            </div>

            {/* Navigation Realm Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {realms.map((realm) => {
                const Icon = realm.icon;
                const isActive = activeRealm === realm.id;
                return (
                  <button
                    key={realm.id}
                    onClick={() => scrollToRealm(realm.id)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(244, 63, 94, 0.18))'
                        : 'rgba(168, 85, 247, 0.06)',
                      border: `1px solid ${isActive ? 'var(--neon-purple)' : 'rgba(168, 85, 247, 0.15)'}`,
                      color: isActive ? 'var(--neon-violet-light)' : 'var(--text-primary)',
                      padding: '14px 16px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '1rem',
                      fontWeight: 700,
                      textAlign: lang === 'ar' ? 'right' : 'left',
                      boxShadow: isActive ? '0 0 20px rgba(168, 85, 247, 0.25)' : 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      minHeight: '48px',
                      touchAction: 'manipulation'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: isActive ? 'var(--neon-purple)' : 'rgba(168, 85, 247, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isActive ? '#ffffff' : 'var(--neon-purple)',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={19} />
                      </div>
                      <span style={{ fontSize: '0.96rem' }}>{lang === 'ar' ? realm.nameAr : realm.nameEn}</span>
                    </div>

                    {isActive && <Sparkles size={16} style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Quick Connect Action */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => scrollToRealm('contact')}
              className="cyber-btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              <Send size={18} />
              <span>{lang === 'ar' ? 'إرسال إشارة للمهندس' : 'Transmit Signal'}</span>
            </button>
            <div className="font-mono" style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              YOUSIF TARIQ // SYSTEMS & SOFTWARE ENGINEER
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInMenu {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
