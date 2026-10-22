"use client";

import { useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import HeroTotem3D from "@/components/HeroTotem3D";

// Exact HoverLinks component from Redoyan's src/components/HoverLinks.tsx
function HoverLinks({ text, cursor }: { text: string; cursor?: boolean }) {
  return (
    <div className="hover-link" data-cursor={!cursor ? "disable" : undefined}>
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </div>
  );
}

export default function PortfolioHome() {
  // Exact Magnetic Social Icon Physics from Redoyan's src/components/SocialIcons.tsx
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      let mouseX = 25;
      let mouseY = 25;
      let currentX = 25;
      let currentY = 25;
      let rafId: number;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      rafId = requestAnimationFrame(updatePosition);

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafId);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main className="main-body">
      <CustomCursor />

      {/* 1. TOP NAVBAR (Matches src/components/Navbar.tsx) */}
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          MF
        </a>
        <a
          href="mailto:favazam98@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          favazam98@gmail.com
        </a>
        <ul>
          <li>
            <a href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      {/* Rotating Ambient Burgundy Corner Glows */}
      <div className="landing-circle1" />
      <div className="landing-circle2" />

      {/* 2. BOTTOM-LEFT SOCIALS & BOTTOM-RIGHT RESUME (Matches src/components/SocialIcons.tsx) */}
      <div className="icons-section">
        <div className="social-icons" data-cursor="icons" id="social">
          {/* GitHub */}
          <span>
            <a
              href="https://github.com/favaz-am"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </span>

          {/* LinkedIn */}
          <span>
            <a
              href="https://www.linkedin.com/in/favaz-am"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </span>

          {/* X (Twitter) */}
          <span>
            <a
              href="https://x.com/Favaz__AM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </span>

          {/* Instagram */}
          <span>
            <a
              href="https://instagram.com/favaz.am"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </span>
        </div>

        {/* Resume Button */}
        <a className="resume-button" href="/resume.pdf" target="_blank">
          <HoverLinks text="RESUME" />
          <span className="resume-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              <line x1="9" y1="9" x2="10" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
          </span>
        </a>
      </div>

      {/* 3. LANDING SECTION & 3D CENTER TOTEM (Matches src/components/Landing.tsx) */}
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          {/* Left: Hello! I'm MUHAMMED FAVAZ AM */}
          <div className="landing-intro">
            <h2>Hello! I&apos;m</h2>
            <h1>
              MUHAMMED <br />
              <span>FAVAZ AM</span>
            </h1>
          </div>

          {/* Right: A + Blended MERN STACK behind FULL-STACK DEVELOPER */}
          <div className="landing-info">
            <h2 className="landing-info-h2">
              MERN STACK
            </h2>
            <h2 className="landing-front-h2">
              Full-Stack Developer
            </h2>
          </div>
        </div>

        {/* Center 3D Totem + Burgundy Rim Glow */}
        <div className="character-rim" />
        <div className="character-center-stage">
          <HeroTotem3D />
        </div>
      </div>
    </main>
  );
}