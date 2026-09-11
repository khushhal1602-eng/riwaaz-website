import React, { useState, useEffect, useRef } from 'react';
import { CAPSULE_VIDEO_SRC } from '../data/products';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
} from 'lucide-react';

export default function LaunchVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <section id="capsule-video" className="relative bg-ink text-ivory grain py-24 md:py-36 overflow-hidden">
      {/* Ambient Golden Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-6xl text-ivory leading-tight">
            The Soul of Riwaaz.
          </h2>
          <p className="mt-4 text-ivory/75 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
            A visual ode to generational shoe-making, genuine leather craft, and the rhythm of needle and thread.
          </p>
        </div>

        {/* Centerpiece Luxury Vertical Fashion Video Player */}
        <div className="max-w-md md:max-w-lg mx-auto">
          <div
            onClick={togglePlay}
            className="relative aspect-4/5 md:aspect-[9/16] max-h-[78vh] w-full overflow-hidden bg-black rounded-sm border-2 border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(201,162,74,0.2)] group cursor-pointer"
          >
            <video
              ref={videoRef}
              src={CAPSULE_VIDEO_SRC}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            >
              <source src={CAPSULE_VIDEO_SRC} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>

            {/* Inner Border Accent */}
            <div className="absolute inset-2 border border-gold/20 pointer-events-none rounded-xs hidden sm:block" />

            {/* Center Play Icon when Paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 transition-all">
                <div className="w-16 h-16 rounded-full bg-gold/90 text-ink flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play size={28} className="ml-1" />
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 md:p-5 flex items-center justify-between opacity-95 group-hover:opacity-100 transition-opacity z-10"
            >
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-ivory/20 hover:bg-gold hover:text-ink backdrop-blur-md flex items-center justify-center text-ivory border border-white/25 transition-all shadow-sm"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-ivory/20 hover:bg-gold hover:text-ink backdrop-blur-md flex items-center justify-center text-ivory border border-white/25 transition-all shadow-sm"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-mono uppercase tracking-wider text-ivory/80 bg-black/60 px-2.5 py-1 rounded-xs border border-white/10">
                  {isMuted ? 'Tap for Sound' : 'Sound Active'}
                </span>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="w-9 h-9 rounded-full bg-ivory/20 hover:bg-gold hover:text-ink backdrop-blur-md flex items-center justify-center text-ivory border border-white/25 transition-all shadow-sm"
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-gold/80 font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-gold" />
              <span>HANDCRAFTED IN PUNJAB</span>
            </span>
            <span>46 SECONDS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
