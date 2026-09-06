import React, { useState, useEffect, useRef } from 'react';
import { InstagramIcon } from './Icons';
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, INSTAGRAM_VIDEO_SRC } from '../data/products';
import Reveal from './Reveal';

export default function InstagramShowcase({ videoSrc = INSTAGRAM_VIDEO_SRC }) {
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
    <section className="bg-secondary/40 border-y border-border/80 py-24 md:py-32 overflow-hidden relative">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 relative z-10">
        {/* Header Block */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-maroon mb-3">
              <InstagramIcon size={18} />
              <span className="eyebrow tracking-[0.25em] text-maroon">{INSTAGRAM_HANDLE}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">
              Follow our story on Instagram.
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
              Glimpses of quiet craftsmanship, artisan hands at work, new drop announcements, and everyday styling inspiration.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-maroon text-ivory px-8 py-4 rounded-[1px] tracking-[0.2em] text-xs uppercase font-sans font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:bg-burgundy inline-flex items-center gap-2.5 shrink-0 self-start md:self-end border border-gold/40 hover:border-gold"
          >
            <InstagramIcon size={16} className="text-gold group-hover:scale-110 transition-transform" />
            <span>Follow {INSTAGRAM_HANDLE}</span>
            <ArrowUpRight size={15} className="text-gold opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </Reveal>

        {/* Featured 16:9 Cinematic Video Player */}
        <Reveal className="mt-4">
          <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-gold/35 shadow-[0_25px_70px_rgba(0,0,0,0.4)] bg-ink group">
            {/* Ambient Golden Glow Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-maroon/20 to-gold/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            <div
              onClick={togglePlay}
              className="relative aspect-video w-full overflow-hidden cursor-pointer bg-ink"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                loop
                muted
                autoPlay
                className="w-full h-full object-cover select-none"
              />

              {/* Subtle Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40 pointer-events-none" />

              {/* Top Badge Overlay */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-ink/70 backdrop-blur-md border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span>Atelier Film · C0866</span>
              </div>

              {/* Big Center Play/Pause Indicator (Shows when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-maroon/85 border border-gold/70 text-gold flex items-center justify-center shadow-2xl backdrop-blur-sm animate-scaleIn">
                    <Play size={32} className="ml-1 fill-gold" />
                  </div>
                </div>
              )}

              {/* Bottom Video Controls Bar */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-4 inset-x-4 md:bottom-6 md:inset-x-6 z-20 flex items-center justify-between pointer-events-auto"
              >
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="w-10 h-10 rounded-full bg-ink/80 backdrop-blur-md border border-gold/40 text-ivory hover:text-gold hover:border-gold transition-all duration-300 flex items-center justify-center shadow-lg"
                  >
                    {isPlaying ? <Pause size={17} /> : <Play size={17} className="ml-0.5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="w-10 h-10 rounded-full bg-ink/80 backdrop-blur-md border border-gold/40 text-ivory hover:text-gold hover:border-gold transition-all duration-300 flex items-center justify-center shadow-lg"
                  >
                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Toggle Fullscreen"
                    className="w-10 h-10 rounded-full bg-ink/80 backdrop-blur-md border border-gold/40 text-ivory hover:text-gold hover:border-gold transition-all duration-300 flex items-center justify-center shadow-lg"
                  >
                    <Maximize2 size={16} />
                  </button>

                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink/80 backdrop-blur-md border border-gold/40 text-gold hover:bg-gold hover:text-ink text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 shadow-lg"
                  >
                    <InstagramIcon size={14} />
                    <span>Watch on Instagram</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Footer Callout */}
        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground font-light">
            Tag <span className="text-maroon font-medium">#RiwaazByJiya</span> or <span className="text-maroon font-medium">{INSTAGRAM_HANDLE}</span> to be featured in our collective styling stories.
          </p>
        </div>
      </div>
    </section>
  );
}

