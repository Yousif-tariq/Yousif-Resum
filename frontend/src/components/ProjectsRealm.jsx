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
        particleCount: 45,
        spread: 70,
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
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.85rem' }}>
            <Code2 size={15} />
            <span>REALM 03 // PROJECT MULTIVERSE</span>
          </div>
          <h2
            className="font-cyber text-glow-purple"
            style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              color: 'var(--text-heading)'
            }}
          >
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.7 }}>
            {data.subtitle}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
            gap: 'clamp(1.2rem, 3vw, 1.75rem)',
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
                padding: 'clamp(1.25rem, 3vw, 1.85rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="cyber-badge">
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
                      fontSize: '0.7rem'
                    }}
                    title="مشاهدة محاكاة الأنيميشن الحية للمشروع"
                  >
                    <Play size={11} fill="var(--neon-cyan)" />
                    <span>{lang === 'ar' ? 'مشهد متحرك' : 'Live Motion'}</span>
                  </button>
                </div>

                <h3
                  className="font-cyber"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                    fontWeight: 800,
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem'
                  }}
                >
                  {project.desc}
                </p>

                {/* Micro Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    padding: '8px',
                    borderRadius: '12px',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1.25rem',
                    textAlign: 'center'
                  }}
                >
                  {Object.entries(project.stats).map(([key, val], idx) => (
                    <div key={idx}>
                      <div className="font-mono" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.88rem)', fontWeight: 800, color: 'var(--neon-purple)' }}>
                        {val}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono"
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.1)',
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
                  style={{
                    flex: '1 1 140px',
                    padding: '10px 14px',
                    fontSize: '0.86rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Cpu size={15} />
                  <span>{lang === 'ar' ? 'فحص المعمارية' : 'Inspect Blueprint'}</span>
                </button>

                <button
                  onClick={() => launchProjectAnimation(pIdx)}
                  className="cyber-btn-primary"
                  style={{
                    flex: '1 1 120px',
                    padding: '10px 14px',
                    fontSize: '0.86rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Film size={15} />
                  <span>{lang === 'ar' ? 'المشهد الحركي' : 'Animation'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep Architecture Blueprint Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--modal-overlay)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeInModal 0.2s ease-out'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel-glow"
            style={{
              maxWidth: '40rem',
              width: '100%',
              maxHeight: '90vh',
              maxHeight: '90dvh',
              overflowY: 'auto',
              padding: 'clamp(1.25rem, 4vw, 2.25rem)',
              border: '1px solid var(--neon-purple)',
              boxShadow: 'var(--glow-purple)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '8px' }}>
              <div className="cyber-badge">
                <Terminal size={14} />
                <span>SYSTEM ARCHITECTURE REPORT</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="cyber-btn-secondary"
                style={{ padding: '6px 10px', borderRadius: '8px', minHeight: '34px' }}
                aria-label="إغلاق النافذة"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="font-cyber text-glow-purple" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.55rem)', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--text-heading)' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedProject.desc}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--neon-purple)', marginBottom: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={15} />
                <span>{lang === 'ar' ? 'المعايير والخصائص المعمارية:' : 'Core Architectural Milestones:'}</span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--neon-purple)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  launchProjectAnimation(0);
                }}
                className="cyber-btn-primary"
                style={{ flex: '1 1 180px', padding: '12px' }}
              >
                <Film size={16} />
                <span>{lang === 'ar' ? 'تشغيل المشهد الحركي للمشروع' : 'Play Live Motion Scene'}</span>
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="cyber-btn-secondary"
                style={{ flex: '1 1 120px', padding: '12px' }}
              >
                <span>{lang === 'ar' ? 'إغلاق' : 'Close'}</span>
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

      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
