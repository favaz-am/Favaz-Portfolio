"use client";

import { GraduationCap, Cpu, Radio } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5">
      <div className="mb-12 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-widest text-[#9E4758]">
          Background & Engineering Journey
        </p>
        <h2 className="mt-2 text-3xl font-semibold">About Me</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Main Bio / Narrative */}
        <div className="rounded-2xl border border-white/10 bg-[#121113] p-8 md:col-span-7 flex flex-col justify-between">
          <div className="space-y-4 text-sm leading-relaxed text-[#8E8C94]">
            <p className="text-[#EDEDEF] font-medium text-base">
              Hi, I&apos;m Muhammed Favaz Anantha Mangalam — a self-taught MERN Stack Developer building modern web applications since early 2025.
            </p>
            <p>
              I specialize in architecting scalable frontends with Next.js and React, pairing them with robust Node.js, Express, and MongoDB backends. I also enjoy blending software engineering with interactive 3D elements and AI integrations.
            </p>
            <p>
              Alongside software development, I am expanding into tech and science content creation, breaking down complex engineering concepts and technical news.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs text-[#8E8C94]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#9E4758]" />
              Based in Kerala, India (Open to Kozhikode, Kochi, Bengaluru & Remote)
            </div>
          </div>
        </div>

        {/* Quick Highlights / Education Cards */}
        <div className="space-y-4 md:col-span-5">
          <div className="rounded-xl border border-white/10 bg-[#121113] p-5 flex items-start gap-4">
            <div className="rounded-lg bg-[#0A0A0C] border border-[#6E2635]/40 p-3 text-[#9E4758]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#EDEDEF]">Education</h3>
              <p className="mt-1 text-xs text-[#8E8C94]">
                Pursuing Bachelor of Computer Applications (BCA) via distance learning through IGNOU.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121113] p-5 flex items-start gap-4">
            <div className="rounded-lg bg-[#0A0A0C] border border-[#6E2635]/40 p-3 text-[#9E4758]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#EDEDEF]">Core Specialization</h3>
              <p className="mt-1 text-xs text-[#8E8C94]">
                MERN Stack, TypeScript, Next.js App Router, and Interactive 3D Web Canvas integrations.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121113] p-5 flex items-start gap-4">
            <div className="rounded-lg bg-[#0A0A0C] border border-[#6E2635]/40 p-3 text-[#9E4758]">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#EDEDEF]">Upcoming Initiative</h3>
              <p className="mt-1 text-xs text-[#8E8C94]">
                Launching tech & science media content creation to share development insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}