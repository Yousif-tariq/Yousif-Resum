import React, { useState, useEffect } from 'react';
import { Code2, ExternalLink, Activity, Zap, CheckCircle2, X, Terminal, Cpu, Sparkles, Film, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import CyberMotionPlayer from './CyberMotionPlayer';

export default function ProjectsRealm({ data, lang }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const [cinemaSceneIndex, setCinemaSceneIndex] = useState(0);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const handleInspect = (project) => {
    setSelectedProject(project);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        colors: ['#a855f7', '#f43f5e', '#c084fc', '#06b6d4'],
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  const launchProjectAnimation = (projectIndex) => {
    setCinemaSceneIndex(projectIndex % 4);
    setCinemaOpen(true);
  };

  return (
    <section id="projects" className="realm-section" style={{ position: 'relative' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Realm Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.75rem' }}>
            <Code2 size={14} />
            <span>REALM 03 // PROJECT MULTIVERSE</span>
          </div>
          <h2
            className="font-cyber text-glow-purple"
            style={{
              fontSize: 'clamp(1.75rem, 4.2vw, 3rem)',
              fontWeight: 800,
              marginBottom: '0.65rem',
              color: 'var(--text-heading)'
            }}
          >
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.65 }}>
            {data.subtitle}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.6rem)',
            maxWidth: '78rem',
            margin: '0 auto',
            width: '100%'
          }}
        >
          {data.items.map((project, pIdx) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                padding: 'clamp(1.1rem, 2.8vw, 1.7rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="cyber-badge" style={{ fontSize: '0.72rem' }}>
                    {project.category}
                  </span>
                  
                  {/* Live Motion Scene Trigger Badge */}
                  <button
                    onClick={() => launchProjectAnimation(pIdx)}
                    className="cyber-badge"
                    style={{
                      cursor: 'pointer',
                      borderColor: 'var(--neon-cyan)',
                      color: 'var(--neon-cyan)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      padding: '3px 8px',
                      fontSize: '0.7rem',
                      touchAction: 'manipulation'
                    }}
                    title="مشاهدة محاكاة الأنيميشن الحية للمشروع"
                  >
                    <Play size={10} fill="var(--neon-cyan)" />
                    <span>{lang === 'ar' ? 'مشهد متحرك' : 'Live Motion'}</span>
                  </button>
                </div>

                <h3
                  className="font-cyber"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                    fontWeight: 800,
                    marginBottom: '0.65rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.1rem'
                  }}
                >
                  {project.desc}
                </p>

                {/* Micro Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '4px',
                    padding: '8px',
                    borderRadius: '12px',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1.1rem',
                    textAlign: 'center'
                  }}
                >
                  {Object.entries(project.stats).map(([key, val], idx) => (
                    <div key={idx}>
                      <div className="font-mono" style={{ fontSize: 'clamp(0.72rem, 1.6vw, 0.84rem)', fontWeight: 800, color: 'var(--neon-purple)' }}>
                        {val}
                      </div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.25rem' }}>
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono"
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.08)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--neon-violet-light)',
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleInspect(project)}
                  className="cyber-btn-secondary"
                  style={{ flex: '1 1 120px', padding: '9px 14px', fontSize: '0.82rem' }}
                >
                  <Cpu size={14} />
                  <span>{data.viewDetails}</span>
                </button>

                <button
                  onClick={() => launchProjectAnimation(pIdx)}
                  className="cyber-btn-primary"
                  style={{ flex: '1 1 120px', padding: '9px 14px', fontSize: '0.82rem' }}
                >
                  <Sparkles size={14} />
                  <span>{lang === 'ar' ? 'محاكاة الأنمي' : 'Simulate'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep Blueprint Modal Viewer - Mobile Optimized Bottom-Sheet */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            background: 'var(--modal-overlay)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel-glow"
            style={{
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              maxHeight: '90dvh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              position: 'relative',
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.9)',
              paddingBottom: 'max(2rem, var(--sab))',
              paddingLeft: 'max(1.25rem, var(--sal))',
              paddingRight: 'max(1.25rem, var(--sar))'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', gap: '10px' }}>
              <div>
                <span className="cyber-badge" style={{ marginBottom: '0.4rem' }}>
                  {selectedProject.category}
                </span>
                <h3 className="font-cyber" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', fontWeight: 900, color: 'var(--text-heading)' }}>
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="cyber-btn-secondary"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: 0
                }}
                aria-label="إغلاق المعاينة"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedProject.blueprint}
            </p>

            {/* Architectural Highlights */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="font-cyber" style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--neon-purple)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={15} />
                <span>{lang === 'ar' ? 'السمات المعمارية والأداء' : 'Architectural Metrics'}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedProject.highlights.map((hl, hIdx) => (
                  <div
                    key={hIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: 'rgba(168, 85, 247, 0.08)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.86rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <CheckCircle2 size={15} style={{ color: 'var(--neon-emerald)', flexShrink: 0 }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  launchProjectAnimation(0);
                }}
                className="cyber-btn-primary"
                style={{ flex: '1 1 180px' }}
              >
                <Film size={16} />
                <span>{lang === 'ar' ? 'تشغيل المشهد السينمائي' : 'Launch Holo-Cinema'}</span>
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="cyber-btn-secondary"
                style={{ flex: '1 1 140px' }}
              >
                <span>{lang === 'ar' ? 'إغلاق المعاينة' : 'Close Details'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Cyber Motion Player Cinema Modal */}
      <CyberMotionPlayer
        isOpen={cinemaOpen}
        onClose={() => setCinemaOpen(false)}
        initialSceneIndex={cinemaSceneIndex}
        lang={lang}
      />
    </section>
  );
}
