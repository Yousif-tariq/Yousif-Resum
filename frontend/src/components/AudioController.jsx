import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc3, Volume2, VolumeX, SkipForward, SkipBack, Play, Pause, Sparkles, Sliders, Radio, Flame, Moon, Heart } from 'lucide-react';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // High-Quality Studio Recorded Music Tracks
  const tracks = [
    {
      id: 1,
      title: 'Cyberpunk Odyssey // Epic Piano & Synth',
      artist: 'Studio Masters',
      genre: 'Cyber Symphony',
      url: '/audio/cyberpunk-odyssey.mp3',
      color: '#a855f7',
      icon: Radio
    },
    {
      id: 2,
      title: 'Quantum Horizon // Orchestral Electronic',
      artist: 'Spatial Soundscape',
      genre: 'Orchestral Synth',
      url: '/audio/quantum-synth.mp3',
      color: '#f43f5e',
      icon: Flame
    },
    {
      id: 3,
      title: 'Deep Space Journey // Ambient Piano',
      artist: 'Cosmic Harmonics',
      genre: 'Deep Space Chill',
      url: '/audio/deep-space.mp3',
      color: '#00f0ff',
      icon: Moon
    },
    {
      id: 4,
      title: 'Neon Drift // High Energy Retrowave',
      artist: 'Velocity Core',
      genre: '80s Electro Groove',
      url: '/audio/neon-drift.mp3',
      color: '#10b981',
      icon: Sparkles
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Initialize & Listen to Audio Events
  useEffect(() => {
    const audio = new Audio();
    audio.src = currentTrack.url;
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle Track Changes
  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].url;
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Autoplay handled:', e));
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Play request blocked by browser policy:', err);
      });
    }
  };

  const nextTrack = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    selectTrack(nextIdx);
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const prevTrack = (e) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    selectTrack(prevIdx);
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Main Bar Navigation Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        
        {/* Play/Pause Main Button */}
        <button
          onClick={togglePlay}
          className="cyber-btn-secondary"
          style={{
            padding: '8px 14px',
            fontSize: '0.82rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isPlaying ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(244, 63, 94, 0.25))' : 'var(--color-surface)',
            border: `1px solid ${isPlaying ? currentTrack.color : 'var(--color-border)'}`,
            boxShadow: isPlaying ? `0 0 25px ${currentTrack.color}66` : 'none',
            color: 'var(--text-primary)'
          }}
          title={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى الاستوديو الحقيقية'}
        >
          {isPlaying ? (
            <>
              <Disc3
                size={18}
                style={{
                  color: currentTrack.color,
                  animation: 'spinDisc 3s linear infinite'
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: currentTrack.color, fontWeight: 800, fontSize: '0.8rem' }}>
                  {currentTrack.genre}
                </span>
                {/* Dynamic Wave Equalizer */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
                  <span style={{ width: '3px', height: '100%', background: currentTrack.color, animation: 'waveBar 0.5s ease-in-out infinite alternate', borderRadius: '2px' }} />
                  <span style={{ width: '3px', height: '65%', background: 'var(--neon-purple)', animation: 'waveBar 0.35s ease-in-out infinite alternate 0.15s', borderRadius: '2px' }} />
                  <span style={{ width: '3px', height: '85%', background: 'var(--neon-violet-light)', animation: 'waveBar 0.45s ease-in-out infinite alternate 0.3s', borderRadius: '2px' }} />
                  <span style={{ width: '3px', height: '50%', background: 'var(--neon-cyan)', animation: 'waveBar 0.6s ease-in-out infinite alternate 0.1s', borderRadius: '2px' }} />
                </div>
              </div>
            </>
          ) : (
            <>
              <Music size={17} style={{ color: 'var(--neon-purple)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>الموسيقى 🎵</span>
            </>
          )}
        </button>

        {/* Quick Next Track Switcher */}
        {isPlaying && (
          <button
            onClick={nextTrack}
            className="cyber-btn-secondary"
            style={{ padding: '8px 10px', borderRadius: '10px' }}
            title="المقطوعة التالية"
          >
            <SkipForward size={14} style={{ color: currentTrack.color }} />
          </button>
        )}

        {/* Music Player & Settings Drawer Toggle */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="cyber-btn-secondary"
          style={{ padding: '8px 10px', borderRadius: '10px' }}
          title="مشغل الموسيقى وقائمة المقطوعات"
        >
          {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} style={{ color: 'var(--neon-purple)' }} />}
        </button>

      </div>

      {/* Futuristic Studio Music Player Card */}
      {showMenu && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            [document.documentElement.dir === 'rtl' ? 'left' : 'right']: 0,
            padding: '18px 22px',
            borderRadius: '20px',
            border: `1px solid ${currentTrack.color}`,
            boxShadow: 'var(--glow-purple)',
            zIndex: 60,
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* Header & Track Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span className="cyber-badge" style={{ padding: '2px 8px', fontSize: '0.7rem', color: currentTrack.color, borderColor: currentTrack.color }}>
                {currentTrack.genre}
              </span>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="font-cyber" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentTrack.title}
            </div>
          </div>

          {/* Time Scrubber */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="1"
            value={currentTime}
            onChange={handleSeek}
            style={{
              width: '100%',
              accentColor: currentTrack.color,
              cursor: 'pointer'
            }}
          />

          {/* Playback Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={prevTrack}
              className="cyber-btn-secondary"
              style={{ padding: '8px', borderRadius: '50%' }}
              title="السابق"
            >
              <SkipBack size={15} />
            </button>

            <button
              onClick={togglePlay}
              className="cyber-btn-primary"
              style={{ padding: '10px 18px', borderRadius: '50px' }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={nextTrack}
              className="cyber-btn-secondary"
              style={{ padding: '8px', borderRadius: '50%' }}
              title="التالي"
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Volume Slider */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Volume2 size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '100%',
                accentColor: currentTrack.color,
                cursor: 'pointer'
              }}
            />
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '32px' }}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Playlist Track Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>قائمة المقطوعات الاستوديو (Studio Tracks):</span>
            
            {tracks.map((t, idx) => {
              const Icon = t.icon;
              const isSelected = currentTrackIndex === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => selectTrack(idx)}
                  style={{
                    background: isSelected ? 'rgba(168, 85, 247, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isSelected ? t.color : 'var(--color-border)'}`,
                    padding: '8px 10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={14} style={{ color: t.color }} />
                    <div style={{ fontSize: '0.78rem', fontWeight: isSelected ? 800 : 500, color: isSelected ? t.color : 'var(--text-primary)' }}>
                      {t.title.split('//')[0]}
                    </div>
                  </div>
                  {isSelected && <Sparkles size={13} style={{ color: t.color }} />}
                </div>
              );
            })}
          </div>

        </div>
      )}

      <style>{`
        @keyframes spinDisc {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes waveBar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
