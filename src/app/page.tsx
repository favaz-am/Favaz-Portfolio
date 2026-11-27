"use client";

import { useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import HeroAvatar from "@/components/HeroAvatar";
import HoverLinks from "@/components/HoverLinks";
import SocialIcons from "@/components/SocialIcons";
import AboutSection from "@/components/AboutSection";
import WhatIDo from "@/components/WhatIDo";
import Career from "@/components/Career";
import MyWork from "@/components/MyWork";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function PortfolioHome() {
  useEffect(() => {
    const landingDiv = document.getElementById("landingDiv");
    if (!landingDiv) return;

    const handleScroll = () => {
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.45), 0), 1);
      landingDiv.style.setProperty("--hero-opacity", `${1 - progress}`);
      landingDiv.style.setProperty("--hero-shift", `${-progress * 45}px`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="main-body">
      <CustomCursor />
      <HeroAvatar />

      {/* 1. TOP NAVBAR */}
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
            <a href="#projects">
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

      {/* AMBIENT GLOWS */}
      <div className="landing-circle1" />
      <div className="landing-circle2" />

      {/* 2. SOCIALS & RESUME */}
      <SocialIcons />

      {/* 3. HERO / LANDING SECTION */}
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I&apos;m</h2>
            <h1>
              MUHAMMED <br />
              <span>FAVAZ AM</span>
            </h1>
          </div>

          {/* Mobile-only portrait (hidden on desktop >= 1024px) */}
          <div className="mobile-portrait-wrap">
            <div className="mobile-portrait-glow" />
            <img
              src="/images/favaz-portrait.webp"
              alt="Muhammed Favaz AM"
              className="mobile-portrait-img"
            />
          </div>

          <div className="landing-info">
            <h2 className="landing-info-h2">MERN STACK</h2>
            <h2 className="landing-front-h2">Full-Stack Developer</h2>
          </div>
        </div>

        <div className="character-rim" />
        <div className="character-center-stage" />
      </div>

      {/* 4. SCROLLABLE SECTIONS */}
      <div className="relative z-10 w-full">
        {/* Section 2: About */}
        <AboutSection />

        {/* Section 3: What I Do */}
        <WhatIDo />

        {/* Section 4: Career & Experience */}
        <Career />

        {/* Section 5: My Work */}
        <MyWork />

        {/* Section 6: Tech Stack */}
        <TechStack />

        {/* Section 7: Contact */}
        <Contact />
      </div>
    </main>
  );
}