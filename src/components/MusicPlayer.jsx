import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/MusicPlayer.css';

const songs = [
  { id: 0, title: "Malu Malu", artist: "DIA & INDAHKUS", src: "audio/malu-malu.mp3", cover: "https://cdn.medcom.id/dynamic/content/2026/02/21/1805998/Qil0qHkBZo.jpg?w=1024" },
  { id: 1, title: "Garam Madu", artist: "Tenxi & Naykilla", src: "audio/garam-madu.mp3", cover: "https://i1.sndcdn.com/artworks-l9lm8ITzbBpbCgjk-GMX9Kw-t500x500.jpg" },
  { id: 2, title: "So Asu", artist: "Naykilla", src: "audio/so-asu.mp3", cover: "https://i.scdn.co/image/ab67616d0000b273bc3ac83da4a6bda98247e694" },
  { id: 3, title: "Sency", artist: "Dia ft Tenxi", src: "audio/dia.mp3", cover: "https://cdn.medcom.id/dynamic/content/2026/02/21/1805998/Qil0qHkBZo.jpg?w=1024" },
  { id: 4, title: "Hilang", artist: "Shinji Sho · Chaeroel", src: "audio/hilang.mp3", cover: "https://i.ytimg.com/vi/4-bWKwgwj7k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBEf2AHjYUzI5SBbs1YGSbzR8--AA" },
  { id: 5, title: "Rindu Pelukmu", artist: "Chaeroel Ft. 4Loven", src: "audio/rindu-peluk.mp3", cover: "https://i.ytimg.com/vi/DBLpO-HzdtM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLACUf610ATxW1QIYag6FaCBBsFxVw" },
];

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationRef = useRef(null);
  const progressRef = useRef(null);

  const currentSong = songs[currentIndex];

useEffect(() => {
  if (audioRef.current) {
    // Simpan status apakah lagu lagi diputar atau tidak
    const wasPlaying = isPlaying;
    
    audioRef.current.pause(); // Stop lagu sebelumnya
    audioRef.current.load();  // Muat lagu baru berdasarkan currentIndex
    audioRef.current.currentTime = 0;

    // Hanya play otomatis jika sebelumnya user memang sudah menekan tombol play
    if (wasPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }
}, [currentIndex]);

  const getCardStyle = (index) => {
    const total = songs.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;
    const isMobile = window.innerWidth < 480;
    const xOffset = isMobile ? 170 : 260;

    if (diff === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 10, y: 0 };
    if (diff === 1) return { x: xOffset, scale: isMobile ? 0.65 : 0.8, opacity: 0.25, zIndex: 1, y: 20 };
    if (diff === -1) return { x: -xOffset, scale: isMobile ? 0.65 : 0.8, opacity: 0.25, zIndex: 1, y: 20 };
    return { x: 0, scale: 0, opacity: 0, zIndex: 0, y: 0 };
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const initAudioContext = () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const analyzer = ctx.createAnalyser();
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyzer);
      analyzer.connect(ctx.destination);
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');

      const renderVisualizer = () => {
        animationRef.current = requestAnimationFrame(renderVisualizer);
        analyzer.getByteFrequencyData(dataArray);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const isMobile = window.innerWidth < 480;
        const centerY = (height / 2) -  0;

        

        canvasCtx.clearRect(0, 0, width, height);
        let bassSum = 0;
        for (let i = 0; i < 10; i++) bassSum += dataArray[i];
        const bassAvg = bassSum / 10;

        const baseRadius = isMobile ? 80 : 115;
        const radius = baseRadius + (bassAvg * 0.15);
        const totalBars = 120;

        for (let i = 0; i < totalBars; i++) {
          const dataIndex = i % (bufferLength / 2);
          const barMultiplier = isMobile ? 0.25 : 0.4;
          const barHeight = Math.max(isMobile ? 4 : 6, (dataArray[dataIndex] * barMultiplier));
          const angle = (i * 2 * Math.PI) / totalBars - (Math.PI / 2);
          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const x2 = centerX + Math.cos(angle) * (radius + barHeight);
          const y2 = centerY + Math.sin(angle) * (radius + barHeight);

          const grad = canvasCtx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          grad.addColorStop(1, 'rgba(0, 242, 254, 0.1)');

          canvasCtx.lineWidth = 3.5;
          canvasCtx.lineCap = 'round';
          canvasCtx.strokeStyle = grad;
          canvasCtx.beginPath();
          canvasCtx.moveTo(x1, y1);
          canvasCtx.lineTo(x2, y2);
          canvasCtx.stroke();
        }
      };
      renderVisualizer();
    };

    const handlePlay = () => { if (!analyzerRef.current) initAudioContext(); };
    audio.addEventListener('play', handlePlay);
    return () => {
      audio.removeEventListener('play', handlePlay);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = newTime;
  };

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => setCurrentIndex((currentIndex + 1) % songs.length);
  const prevSong = () => setCurrentIndex((currentIndex - 1 + songs.length) % songs.length);

  return (
    <section className="ultra-music-section">
      <canvas ref={canvasRef} className="ultra-visualizer-canvas" />
      <div className="bg-glow-spot"></div>

      <div className="main-layout">
        <div className="music-header-container">
          <div className="header-top-row">
            <div className="music-badge">
              <Play size={14} fill="currentColor" className="play-icon-mini" />
              <span className="badge-text">// BY THE WAY..</span>
            </div>
            <div className="header-line"></div>
          </div>
          <div className="music-main-title" data-aos="fade-up" data-aos-duration="800">
            <h2 className="title-large">MY</h2>
            <h2 className="title-large">
              FAV <span className="highlight-text">SONG</span>
            </h2>
          </div>
        </div>

        <div className="music-content-wrapper">
          <div className="cards-carousel" data-aos="fade-up" data-aos-duration="800">
            <AnimatePresence>
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  onClick={() => setCurrentIndex(index)}
                  animate={getCardStyle(index)}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  className={`music-card ${index === currentIndex ? 'active' : ''}`}
                >
                  <img src={song.cover} alt={song.title} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div className="slim-control-bar" data-aos="fade-up" data-aos-duration="800">
            <div className="mini-progress-area" ref={progressRef} onClick={handleProgressClick}>
               <div className="mini-progress-fill" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
            </div>
            <div className="control-content">
              <div className="song-details">
                <div className="avatar-container">
                  <img src={currentSong.cover} className={`avatar-rotate ${isPlaying ? 'playing' : ''}`} alt="cover" />
                </div>
                <div className="text-info">
                  <span className="title-text">{currentSong.title}</span>
                  <span className="artist-text">{currentSong.artist}</span>
                </div>
              </div>
              <div className="playback-controls">
                <SkipBack size={22} className="btn-icon" onClick={prevSong} />
                <button className="main-toggle" onClick={togglePlay}>
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />}
                </button>
                <SkipForward size={22} className="btn-icon" onClick={nextSong} />
              </div>
              <div className="time-display">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="total">{formatTime(duration)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <audio
        ref={audioRef} src={currentSong.src} crossOrigin="anonymous"
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={nextSong}
      />
    </section>
  );
};

export default MusicPlayer;