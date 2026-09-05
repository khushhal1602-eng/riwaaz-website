import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, formatINR, CAPSULE_VIDEO_SRC } from '../data/products';
import {
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Film,
} from 'lucide-react';

export default function HorizontalCapsuleScroll() {
  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);

  // Video State — Guaranteed to always resolve to the actual Riwaaz launch video
  const [videoSrc] = useState(() => {
    try {
      const stored = localStorage.getItem('riwaaz_capsule_video_url');
      if (stored && stored.startsWith('/videos/')) {
        return stored;
      }
      localStorage.removeItem('riwaaz_capsule_video_url');
    } catch {}
    return CAPSULE_VIDEO_SRC;
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play on mount and handle autoplay policies
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [videoSrc]);

  // Horizontal Scroll Navigation Handlers (Left / Right Arrow buttons)
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Synchronize playback
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
    <section id="capsule-video" className="relative bg-ink text-ivory grain py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Section Header with Left/Right Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-maroon/80 border border-gold/40 text-gold text-xs font-mono uppercase tracking-widest mb-3">
              <Film size={12} />
              <span>Official Capsule Video Included</span>
            </div>
            <h2 className="mt-1 font-display text-4xl md:text-6xl text-ivory">
              Craft in Motion.
            </h2>
            <p className="text-ivory/70 text-sm md:text-base max-w-lg font-light mt-3">
              Explore the official launch video alongside our four signature silhouettes balancing Punjabi heritage with modern restraint.
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-3 self-end">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gold/30 hover:border-gold bg-[#201b1a] hover:bg-gold hover:text-ink text-gold flex items-center justify-center transition-all duration-300 shadow-lg"
              aria-label="Previous capsule item"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gold/30 hover:border-gold bg-[#201b1a] hover:bg-gold hover:text-ink text-gold flex items-center justify-center transition-all duration-300 shadow-lg"
              aria-label="Next capsule item"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Clean Natural Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* CARD 1: OFFICIAL LAUNCH VIDEO CARD (PROMINENT & DIRECT STREAM) */}
          <div className="w-[88vw] max-w-[360px] md:max-w-[460px] shrink-0 snap-start bg-[#25201f] border-2 border-gold/60 p-5 md:p-6 rounded-sm shadow-2xl flex flex-col justify-between group/card hover:border-gold transition-all duration-300">
            {/* Video Player Viewport */}
            <div
              onClick={togglePlay}
              className="relative aspect-4/5 overflow-hidden bg-black rounded-xs mb-6 border border-white/15 group/video shadow-inner cursor-pointer"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>

              {/* Video Badge */}
              <div className="absolute top-3 left-3 bg-maroon/95 backdrop-blur-md px-3 py-1.5 text-[0.65rem] tracking-widest uppercase text-ivory font-sans border border-gold/50 flex items-center gap-2 shadow-md z-10">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="font-medium">Official Launch Video</span>
              </div>

              {/* Center Play Button Overlay when Paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 transition-all">
                  <div className="w-16 h-16 rounded-full bg-gold/90 text-ink flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play size={28} className="ml-1" />
                  </div>
                </div>
              )}

              {/* Video Player Control Overlay */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 flex items-center justify-between opacity-95 group-hover/video:opacity-100 transition-opacity z-10"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-ivory/25 hover:bg-gold hover:text-ink backdrop-blur-md flex items-center justify-center text-ivory border border-white/20 transition-colors shadow-sm"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-ivory/25 hover:bg-gold hover:text-ink backdrop-blur-md flex items-center justify-center text-ivory border border-white/20 transition-colors shadow-sm"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-ivory/90 bg-black/50 px-2 py-0.5 rounded-xs border border-white/10">
                    {isMuted ? 'Tap for Sound' : 'Sound On'}
                  </span>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="w-9 h-9 rounded-full bg-ivory/25 hover:bg-gold hover:text-ink backdrop-blur-md flex items-center justify-center text-ivory border border-white/20 transition-colors shadow-sm"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Copy */}
            <div>
              <div className="mb-2">
                <p className="eyebrow text-gold text-[0.68rem] tracking-[0.22em] mb-1">Riwaaz Launch Video</p>
                <h3 className="font-display text-2xl md:text-3xl text-ivory leading-snug">
                  Craft in Motion.
                </h3>
              </div>
              <p className="text-xs text-ivory/70 leading-relaxed font-light mb-6">
                Watch the official 46-second fashion campaign film capturing the poetry of Punjabi craftsmanship, authentic leather lasting, and hand-embroidered motifs.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gold/25">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="text-[0.68rem] tracking-wider uppercase text-gold hover:text-ivory inline-flex items-center gap-1.5 transition-colors"
                >
                  <Play size={12} />
                  <span>{isPlaying ? 'Pause Film' : 'Play Film'}</span>
                </button>
                <a
                  href="#collection"
                  className="text-[0.68rem] tracking-wider uppercase text-gold hover:text-ivory inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore Pairs</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* CARDS 2–5: SIGNATURE CAPSULE PRODUCTS */}
          {PRODUCTS.map((product, idx) => {
            const editionNumber = `0${idx + 1}`;
            return (
              <div
                key={product.id}
                className="w-[85vw] max-w-[340px] md:max-w-[400px] shrink-0 snap-start bg-[#25201f] border border-border/60 hover:border-gold/70 p-5 md:p-6 rounded-sm shadow-xl flex flex-col justify-between group/card transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-4/5 overflow-hidden bg-black rounded-xs mb-6 border border-white/10 group/img">
                    <img
                      src={product.images[0]}
                      alt={product.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-ivory/95 backdrop-blur-md px-3 py-1 text-[0.6rem] tracking-widest uppercase text-maroon font-sans border border-border/70 shadow-sm">
                      Edition {editionNumber}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-ink/80 backdrop-blur-sm px-2.5 py-1 text-[0.65rem] font-mono text-gold border border-gold/30">
                      {formatINR(product.price)}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="eyebrow text-gold text-[0.65rem]">Handmade Leather</span>
                    <span className="font-mono text-xs text-ivory/40">Edition {editionNumber}</span>
                  </div>

                  <h3 className="font-display text-2xl text-ivory group-hover/card:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-ivory/70 leading-relaxed font-light line-clamp-2">
                    {product.shortDesc || product.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                  <span className="font-sans text-sm tracking-wide text-ivory font-medium">
                    {formatINR(product.price)}
                  </span>

                  <Link
                    to={`/collection/${product.slug}`}
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-gold hover:text-ivory transition-colors group/link"
                  >
                    <span>View Piece</span>
                    <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
