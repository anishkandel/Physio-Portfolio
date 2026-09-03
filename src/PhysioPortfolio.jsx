import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Bone,
  HeartPulse,
  Dumbbell,
  Waves,
  ShieldCheck,
  Play,
  X,
  ArrowUpRight,
  Menu,
  Image as ImageIcon,
} from "lucide-react";
import myPhoto from "./assets/mypic.jpeg";

/* ------------------------------------------------------------------ */
/*  DATA — swap this out with real content                            */
/* ------------------------------------------------------------------ */
const PORTRAIT_SRC = myPhoto;

// For each video, use the YouTube VIDEO ID only — not the full URL.
// e.g. from https://www.youtube.com/watch?v=dQw4w9WgXcQ the ID is: dQw4w9WgXcQ
const VIDEOS = [
  {
    id: 1,
    tag: "Knee",
    title: "Knee Joint Tapping",
    youtubeId: "R-Sy22ns40Q",
  },
  {
    id: 2,
    tag: "Shoulder",
    title: "Shoulder Joint Tapping",
    youtubeId: "p-G5q0549Wk",
  },
  {
    id: 3,
    tag: "Thumb",
    title: "Thumb Tapping",
    youtubeId: "uytF5skX7kA",
  },
  {
    id: 4,
    tag: "K- Tape",
    title: "Achilles Tendon Tapping",
    youtubeId: "wBdj6oyQqFk",
  },
  {
    id: 5,
    tag: "Ankle",
    title: "Ankle Joint Tapping",
    youtubeId: "SRjfL5m1nZA",
  },
  {
    id: 6,
    tag: "Injury Prevention",
    title: "Theortical Basis of Injury Prevention",
    youtubeId: "gdUcaaraZaI",
  },
];

const SPECIALTIES = [
  { icon: Bone, label: "Orthopaedic & Post-Surgical" },
  { icon: Dumbbell, label: "Sports Performance & Return-to-Play" },
  { icon: Waves, label: "Chronic Pain & Load Management" },
  { icon: HeartPulse, label: "Cardiopulmonary Rehab" },
  { icon: Activity, label: "Neurological Rehabilitation" },
  { icon: ShieldCheck, label: "Injury Prevention Screening" },
];

const STATS = [
  { value: "1.5", suffix: "+", label: "Years in Clinical Practice" },
  { value: "2", suffix: "+", label: "Athletes Returned to Sport" },
  { value: "15", suffix: "+", label: "Patient-Reported Outcome" },
];

/* ------------------------------------------------------------------ */
/*  GONIOMETER — the signature motif: a joint-angle protractor        */
/* ------------------------------------------------------------------ */

function Goniometer({ size = 220, sweep = 132, animate = true, stroke = "var(--tape-blue)" }) {
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;
  const ticks = [];
  for (let a = 0; a <= 180; a += 15) {
    const rad = (Math.PI * a) / 180;
    const x1 = cx - Math.cos(rad) * r;
    const y1 = cy - Math.sin(rad) * r;
    const x2 = cx - Math.cos(rad) * (r - (a % 45 === 0 ? 14 : 8));
    const y2 = cy - Math.sin(rad) * (r - (a % 45 === 0 ? 14 : 8));
    ticks.push(
      <line
        key={a}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth={a % 45 === 0 ? 2 : 1}
        opacity={a % 45 === 0 ? 0.85 : 0.35}
      />
    );
  }
  const needleRad = (Math.PI * sweep) / 180;
  const nx = cx - Math.cos(needleRad) * (r - 10);
  const ny = cy - Math.sin(needleRad) * (r - 10);

  return (
    <svg
      width={size}
      height={size / 1.75}
      viewBox={`0 0 ${size} ${size / 1.75 + 10}`}
      className="goni-svg"
      style={{ color: "var(--ink)" }}
    >
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {ticks}
      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        className={animate ? "goni-needle" : ""}
      />
      <circle cx={cx} cy={cy} r="4.5" fill={stroke} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function PhysioPortfolio() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
  }, [activeVideo]);

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Lora:ital,wght@0,500;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        .pf-root {
          --ink: #16332B;
          --ink-2: #0E211A;
          --stone: #F2F0E9;
          --stone-2: #E7E2D6;
          --tape-blue: #3A6E8F;
          --tape-blue-light: #7CA9C2;
          --nude: #D9B48F;
          --coral: #C15B3E;
          --line: rgba(22,51,43,0.14);
          --line-light: rgba(242,240,233,0.2);
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--stone);
          color: var(--ink);
          width: 100%;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .pf-root * { box-sizing: border-box; }
        .pf-root h1, .pf-root h2, .pf-root h3 {
          font-family: 'Space Grotesk', sans-serif;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .pf-mono {
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
        }
        .pf-serif {
          font-family: 'Lora', serif;
          font-style: italic;
        }
        .pf-section {
          padding: 96px 8vw;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 720px) {
          .pf-section { padding: 64px 6vw; }
        }

        /* NAV */
        .pf-nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 8vw;
          transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }
        .pf-nav.scrolled {
          background: rgba(242,240,233,0.88);
          backdrop-filter: blur(10px);
          box-shadow: 0 1px 0 var(--line);
        }
        .pf-nav-logo { font-weight: 700; font-size: 1.05rem; }
        .pf-nav-logo span { color: var(--tape-blue); }
        .pf-nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
        .pf-nav-links a {
          color: var(--ink); text-decoration: none; font-size: 0.92rem; font-weight: 500;
          opacity: 0.75; transition: opacity 0.2s;
        }
        .pf-nav-links a:hover { opacity: 1; }
        .pf-nav-cta {
          background: var(--ink); color: var(--stone); border: none;
          padding: 10px 20px; border-radius: 999px; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: background 0.2s;
        }
        .pf-nav-cta:hover { background: var(--tape-blue); }
        .pf-nav-mobile-btn { display: none; background: none; border: none; color: var(--ink); cursor: pointer; }
        @media (max-width: 780px) {
          .pf-nav-links { display: none; }
          .pf-nav-mobile-btn { display: block; }
        }


              .pf-mobile-menu {
        position: fixed;
        top: 0; right: 0;
        height: 100vh;
        width: min(78vw, 320px);
        background: var(--stone);
        z-index: 60;
        box-shadow: -8px 0 30px rgba(0,0,0,0.15);
        padding: 28px 24px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      }
      .pf-mobile-menu.open {
        transform: translateX(0);
      }
      .pf-mobile-menu a {
        color: var(--ink);
        text-decoration: none;
        font-size: 1.05rem;
        font-weight: 500;
        padding: 14px 4px;
        border-bottom: 1px solid var(--line);
      }
      .pf-mobile-menu-close {
        align-self: flex-end;
        background: none;
        border: none;
        color: var(--ink);
        cursor: pointer;
        margin-bottom: 12px;
      }
      .pf-mobile-overlay {
        position: fixed;
        inset: 0;
        background: rgba(14,33,26,0.5);
        z-index: 55;
      }

        /* HERO */
        .pf-hero {
          position: relative;
          background: radial-gradient(120% 140% at 80% 0%, var(--ink-2) 0%, var(--ink) 55%, var(--ink) 100%);
          color: var(--stone);
          padding: 72px 8vw 0;
          overflow: hidden;
        }
        .pf-hero-inner {
          display: grid; grid-template-columns: 1.25fr 1fr; gap: 40px;
          align-items: center; max-width: 1280px; margin: 0 auto;
          padding-bottom: 60px;
        }
        @media (max-width: 900px) {
          .pf-hero-inner { grid-template-columns: 1fr; text-align: left; }
        }
        .pf-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--tape-blue-light); margin-bottom: 22px;
        }
        .pf-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--tape-blue-light); }
        .pf-hero h1 {
          font-size: clamp(2.4rem, 5.4vw, 4.2rem);
          line-height: 1.03;
          font-weight: 700;
          max-width: 12ch;
        }
        .pf-hero h1 em {
          font-style: italic;
          font-family: 'Lora', serif;
          color: var(--nude);
          font-weight: 500;
        }
        .pf-hero-sub {
          margin-top: 26px; font-size: 1.05rem; line-height: 1.6;
          color: rgba(242,240,233,0.72); max-width: 46ch;
        }
        .pf-hero-actions { display: flex; gap: 16px; margin-top: 38px; flex-wrap: wrap; }
        .pf-btn-primary {
          background: var(--tape-blue); color: var(--stone); border: none;
          padding: 15px 26px; border-radius: 999px; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; font-family: 'Inter', sans-serif; display: inline-flex;
          align-items: center; gap: 8px; transition: transform 0.2s, background 0.2s;
        }
        .pf-btn-primary:hover { background: #4C82A3; transform: translateY(-2px); }
        .pf-btn-ghost {
          background: transparent; color: var(--stone); border: 1px solid var(--line-light);
          padding: 15px 26px; border-radius: 999px; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; font-family: 'Inter', sans-serif; transition: border-color 0.2s, background 0.2s;
        }
        .pf-btn-ghost:hover { background: rgba(242,240,233,0.06); border-color: rgba(242,240,233,0.5); }

        .pf-hero-visual {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative;
        }
        .pf-goni-label {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; color: var(--nude);
          margin-top: 6px; text-align: center;
        }
        .goni-needle {
          transform-origin: center;
          animation: sweepIn 1.6s cubic-bezier(.2,.9,.25,1) both;
        }
        @keyframes sweepIn {
          from { transform: rotate(70deg); opacity: 0; }
          to   { transform: rotate(0deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .goni-needle { animation: none; }
        }

        .pf-hero-stats {
          border-top: 1px solid var(--line-light);
          display: grid; grid-template-columns: repeat(3, 1fr);
          max-width: 1280px; margin: 0 auto;
        }
        .pf-hero-stats div { padding: 28px 8px; text-align: left; }
        @media (max-width: 900px) { .pf-hero-stats div { padding: 22px 4px; } }
        .pf-stat-value {
          font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: var(--stone);
        }
        .pf-stat-value span { color: var(--nude); font-size: 1.2rem; }
        .pf-stat-label {
          font-size: 0.8rem; color: rgba(242,240,233,0.6); margin-top: 4px; max-width: 20ch;
        }

        /* SECTION HEADS */
        .pf-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 48px; flex-wrap: wrap; }
        .pf-head-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--tape-blue); margin-bottom: 10px; display: block; }
        .pf-head h2 { font-size: clamp(1.7rem, 3vw, 2.4rem); max-width: 16ch; }
        .pf-head p { max-width: 42ch; color: rgba(22,51,43,0.65); line-height: 1.6; font-size: 0.98rem; }

        /* ABOUT */
        .pf-about { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center; }
        @media (max-width: 860px) { .pf-about { grid-template-columns: 1fr; gap: 40px; } }
        .pf-portrait {
          aspect-ratio: 4/5; border-radius: 18px; overflow: hidden; position: relative;
          background: linear-gradient(160deg, var(--stone-2), var(--nude) 140%);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line);
        }
        .pf-portrait::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(115deg, transparent 0 26px, rgba(22,51,43,0.05) 26px 27px);
        }
        .pf-portrait img {
          width: 100%; height: 100%; object-fit: contain; display: block; position: relative; z-index: 1;
        }
        .pf-portrait-empty {
          position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;
          gap: 8px; color: var(--ink); opacity: 0.55; text-align: center; padding: 0 24px;
        }
        .pf-portrait-empty span { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; }
        .pf-about-body p { line-height: 1.75; font-size: 1.02rem; color: rgba(22,51,43,0.78); margin-bottom: 18px; }
        .pf-credentials { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
        .pf-credential {
          border: 1px solid var(--line); padding: 8px 14px; border-radius: 999px;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; color: var(--ink);
          background: rgba(255,255,255,0.4);
        }

        /* VIDEO GRID */
        .pf-video-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .pf-video-grid > *:nth-child(1) { grid-column: span 2; }
        @media (max-width: 980px) {
          .pf-video-grid { grid-template-columns: repeat(2, 1fr); }
          .pf-video-grid > *:nth-child(1) { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .pf-video-grid { grid-template-columns: 1fr; }
          .pf-video-grid > *:nth-child(1) { grid-column: span 1; }
        }
        .pf-video-card {
          position: relative; border-radius: 16px; overflow: hidden; cursor: pointer;
          border: 1px solid var(--line); background: var(--ink);
          aspect-ratio: 4/3;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .pf-video-grid > *:nth-child(1) .pf-video-card { aspect-ratio: 16/9; }
        .pf-video-thumb {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--ink-2), var(--tape-blue) 130%);
          opacity: 0.9; transition: transform 0.5s ease;
        }
        .pf-video-card:hover .pf-video-thumb { transform: scale(1.06); }
        .pf-video-overlay { position: relative; z-index: 2; padding: 20px; color: var(--stone); }
        .pf-video-tag {
          display: inline-block; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem;
          background: rgba(242,240,233,0.15); border: 1px solid rgba(242,240,233,0.25);
          padding: 4px 10px; border-radius: 999px; margin-bottom: 10px; backdrop-filter: blur(4px);
        }
        .pf-video-card h3 { font-size: 1.15rem; line-height: 1.25; margin-bottom: 6px; }
        .pf-video-degree {
          position: absolute; top: 16px; right: 16px; z-index: 2;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: var(--stone);
          background: rgba(15,33,26,0.55); border: 1px solid rgba(242,240,233,0.25);
          padding: 5px 10px; border-radius: 999px; backdrop-filter: blur(4px);
        }
        .pf-play-btn {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 54px; height: 54px; border-radius: 50%; z-index: 2;
          background: rgba(242,240,233,0.92); display: flex; align-items: center; justify-content: center;
          color: var(--ink); transition: transform 0.25s ease, background 0.25s ease;
        }
        .pf-video-card:hover .pf-play-btn { transform: translate(-50%,-50%) scale(1.1); background: var(--stone); }

        /* SPECIALTIES */
        .pf-specialty-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
        @media (max-width: 760px) { .pf-specialty-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .pf-specialty-grid { grid-template-columns: 1fr; } }
        .pf-specialty {
          background: var(--stone); padding: 30px 26px; display: flex; flex-direction: column; gap: 14px;
          transition: background 0.25s ease;
        }
        .pf-specialty:hover { background: var(--stone-2); }
        .pf-specialty svg { color: var(--tape-blue); }
        .pf-specialty span { font-weight: 500; font-size: 0.98rem; }

        /* TESTIMONIAL */
        .pf-testimonial {
          background: var(--ink); color: var(--stone); border-radius: 24px;
          padding: 72px 8vw; text-align: center; position: relative; overflow: hidden;
        }
        .pf-testimonial-quote {
          font-family: 'Lora', serif; font-style: italic; font-weight: 500;
          font-size: clamp(1.3rem, 2.6vw, 1.9rem); line-height: 1.5; max-width: 34ch; margin: 0 auto;
        }
        .pf-testimonial-attr { margin-top: 28px; font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; color: var(--nude); }

        /* FOOTER / CONTACT */
        .pf-footer { background: var(--ink-2); color: var(--stone); padding: 96px 8vw 40px; }
        .pf-footer-inner { max-width: 1280px; margin: 0 auto; }
        .pf-footer h2 { font-size: clamp(2rem, 4.5vw, 3.2rem); max-width: 16ch; }
        .pf-footer-row {
          display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap;
          margin-top: 32px; padding-bottom: 48px; border-bottom: 1px solid var(--line-light);
        }
        .pf-footer-contact { font-size: 1rem; color: rgba(242,240,233,0.7); line-height: 1.8; }
        .pf-footer-contact a { color: var(--stone); text-decoration: none; border-bottom: 1px solid var(--tape-blue-light); }
        .pf-footer-bottom {
          display: flex; justify-content: space-between; padding-top: 28px; font-size: 0.8rem;
          color: rgba(242,240,233,0.45); flex-wrap: wrap; gap: 10px;
        }

        /* LIGHTBOX */
        .pf-lightbox {
          position: fixed; inset: 0; background: rgba(14,33,26,0.9); z-index: 100;
          display: flex; align-items: center; justify-content: center; padding: 5vw;
          backdrop-filter: blur(4px);
        }
        .pf-lightbox-inner { width: 100%; max-width: 920px; position: relative; }
        .pf-lightbox iframe {
          width: 100%; aspect-ratio: 16/9; border-radius: 12px; background: #000; display: block; border: 0;
        }
        .pf-lightbox-placeholder {
          width: 100%; aspect-ratio: 16/9; border-radius: 12px; background: var(--ink);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
          color: var(--stone); border: 1px dashed var(--line-light);
        }
        .pf-lightbox-close {
          position: absolute; top: -46px; right: 0; background: none; border: none; color: var(--stone);
          cursor: pointer; display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 0.85rem;
        }
        .pf-lightbox-caption { margin-top: 16px; color: rgba(242,240,233,0.75); font-size: 0.92rem; max-width: 60ch; }
      `}</style>

      {/* NAV */}
      <nav className={`pf-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="pf-nav-logo">
          Sawagya Maharjan <span></span>
        </div>
        <ul className="pf-nav-links">
          <li><a href="#about">Approach</a></li>
          <li><a href="#cases">Injury Prevention</a></li>
          {/* <li><a href="#specialties">Specialties</a></li> */}
          <li><a href="#contact">Contact</a></li>
        </ul>
        {/* <button className="pf-nav-cta">Book a Session</button> */}
        <button className="pf-nav-mobile-btn" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <Menu size={22} />
        </button>
      </nav>
      {navOpen && (
  <>
    <div className="pf-mobile-overlay" onClick={() => setNavOpen(false)} />
    <div className="pf-mobile-menu open">
      <button className="pf-mobile-menu-close" onClick={() => setNavOpen(false)} aria-label="Close menu">
        <X size={22} />
      </button>
      <a href="#about" onClick={() => setNavOpen(false)}>Approach</a>
      <a href="#cases" onClick={() => setNavOpen(false)}>Injury Prevention</a>
      <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
    </div>
  </>
)}

      {/* HERO */}
      <header className="pf-hero">
        <div className="pf-hero-inner">
          <div>
            <span className="pf-eyebrow">Student of Sport and Exercise Science · Hamilton, NZ</span>
            <h1>
              Prevent <em>injury</em>, recover, and perform.
            </h1>
            <p className="pf-hero-sub">
              Sport and exercise science student based in
              Hamilton, focused on injury prevention, rehabilitation and performance.
            </p>
            <div className="pf-hero-actions">
              {/* <button className="pf-btn-primary">
                Book a Session <ArrowUpRight size={16} />
              </button> */}
              {/* <a href="#cases" style={{ textDecoration: "none" }}>
                <button className="pf-btn-ghost">Watch Case Studies</button>
              </a> */}
            </div>
          </div>
          {/* <div className="pf-hero-visual">
            <Goniometer size={260} sweep={128} />
            <div className="pf-goni-label pf-mono">RANGE OF MOTION · 0°–180°</div>
          </div> */}
        </div>
        <div className="pf-hero-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="pf-stat-value">
                {s.value}
                <span>{s.suffix}</span>
              </div>
              <div className="pf-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* ABOUT */}
      <section className="pf-section" id="about">
        <div className="pf-about">
          <div className="pf-portrait">
            {PORTRAIT_SRC ? (
              <img src={PORTRAIT_SRC} alt="Portrait of Saubhagya Maharjan" />
            ) : (
              <div className="pf-portrait-empty">
                <ImageIcon size={26} strokeWidth={1.5} />
                <span className="pf-mono">ADD HEADSHOT · PORTRAIT_SRC</span>
              </div>
            )}
          </div>
          <div className="pf-about-body">
            <span className="pf-head-eyebrow">My Approach</span>
            {/* <h2 style={{ marginBottom: 20 }}>Rehab is a measurement problem before it's a motivation problem.</h2> */}
            <p>
              Every athlete I work with starts with a real assessment movement screening, strength and function testing, understanding the mechanism of injury, so progress is something we can track, not just hope for. From there, rehabilitation is built around a clear goal: back to training, back to competition, or simply back to moving without pain
            </p>
            <p>
              I've worked closely with athletes across various sports at S&S Health Research Center, supporting the assessment, management, and rehabilitation of sports-related injuries, alongside broader clinical experience across diverse conditions and populations. I'm currently building on this through a degree in Sport and Exercise Science at Wintec, New Zealand, with a focus on injury prevention, athletic rehabilitation, and performance optimization.
            </p>
            <div className="pf-credentials">
              <span className="pf-credential">Sport & Exercise Science Student</span>

              <span className="pf-credential">Hamilton, NZ</span>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO CASE STUDIES */}
      <section className="pf-section" id="cases">
        <div className="pf-head">
          <div>
            <span className="pf-head-eyebrow">Injury Prevention and Tapping</span>
          </div>
        </div>
        <div className="pf-video-grid">
          {VIDEOS.map((v) => (
            <div className="pf-video-card" key={v.id} onClick={() => setActiveVideo(v)}>
              <div className="pf-video-thumb" />
              <div className="pf-video-degree pf-mono">{v.degree}</div>
              <div className="pf-play-btn"><Play size={20} fill="currentColor" /></div>
              <div className="pf-video-overlay">
                <span className="pf-video-tag pf-mono">{v.tag}</span>
                <h3>{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIALTIES */}
      {/* <section className="pf-section" id="specialties">
        <div className="pf-head">
          <div>
            <span className="pf-head-eyebrow">Specialties</span>
            <h2>Where I focus my practice.</h2>
          </div>
        </div>
        <div className="pf-specialty-grid">
          {SPECIALTIES.map(({ icon: Icon, label }) => (
            <div className="pf-specialty" key={label}>
              <Icon size={24} strokeWidth={1.75} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* TESTIMONIAL */}
      {/* <section className="pf-section">
        <div className="pf-testimonial">
          <p className="pf-testimonial-quote">
            "I went from unable to descend a flight of stairs to running my first
            5K in four months. Every session had a clear number attached to it —
            I always knew exactly how far I'd come."
          </p>
          <div className="pf-testimonial-attr pf-mono">— J. HARLOW, ACL RECONSTRUCTION PATIENT</div>
        </div>
      </section> */}

      {/* FOOTER / CONTACT */}
      <footer className="pf-footer" id="contact">
        <div className="pf-footer-inner">
          <span className="pf-head-eyebrow" style={{ color: "var(--nude)" }}>Get Started</span>
          <h2>Let's build your recovery plan.</h2>
          <div className="pf-footer-row">
            <div className="pf-footer-contact">
              swgymaharjan2060@gmail.com<br />
              <a href="tel:+64 0274 167 963">+64 0274 167 963</a><br />
              Hamilton, NZ
            </div>
            {/* <button className="pf-btn-primary">
              Book a Session <ArrowUpRight size={16} />
            </button> */}
          </div>
          <div className="pf-footer-bottom">
            <span>© {new Date().getFullYear()} Sawagya Maharjan</span>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {activeVideo && (
        <div className="pf-lightbox" onClick={() => setActiveVideo(null)}>
          <div className="pf-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="pf-lightbox-close" onClick={() => setActiveVideo(null)}>
              <X size={16} /> Close
            </button>
            {activeVideo.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="pf-lightbox-placeholder">
                <Play size={30} />
                <span className="pf-mono" style={{ fontSize: "0.8rem" }}>
                  Add a YouTube video ID for "{activeVideo.title}"
                </span>
              </div>
            )}
            <p className="pf-lightbox-caption">{activeVideo.blurb}</p>
          </div>
        </div>
      )}
    </div>
  );
}
