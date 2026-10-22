"use client";

import { ProjectItem } from "@/data/projects";
import { X, Lock, Server, ShieldCheck, ExternalLink } from "lucide-react";

export default function ArchitectureModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  if (!project || !project.caseStudy) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#6E2635] bg-[#121113] p-6 text-[#EDEDEF] shadow-2xl md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg border border-white/10 bg-[#0A0A0C] p-2 text-[#8E8C94] hover:border-[#9E4758] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-md border border-[#6E2635]/50 bg-[#6E2635]/15 px-3 py-1 text-xs text-[#9E4758]">
          <Lock className="h-3.5 w-3.5" />
          Protected Commercial Architecture
        </div>

        <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-xs text-[#8E8C94]">{project.category}</p>

        {/* Problem Statement */}
        <div className="mt-6 rounded-xl border border-white/5 bg-[#0A0A0C] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9E4758]">
            1. Core Engineering Problem
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#8E8C94]">
            {project.caseStudy.problem}
          </p>
        </div>

        {/* System Architecture */}
        <div className="mt-4 rounded-xl border border-white/5 bg-[#0A0A0C] p-4">
          <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E4758]">
            <Server className="h-4 w-4" />
            2. System Architecture & Data Flow
          </h4>
          <ul className="mt-3 space-y-2.5 text-sm text-[#8E8C94]">
            {project.caseStudy.architecture.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9E4758]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IP & Security Note */}
        <div className="mt-4 rounded-xl border border-[#6E2635]/30 bg-[#6E2635]/10 p-4">
          <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EDEDEF]">
            <ShieldCheck className="h-4 w-4 text-[#9E4758]" />
            Why the Repository is Private
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-[#8E8C94]">
            {project.caseStudy.securityAndScale}
          </p>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-5">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#6E2635] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#9E4758]"
            >
              Launch Live Production App <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="rounded-lg border border-white/10 bg-[#0A0A0C] px-4 py-2 text-xs text-[#8E8C94]">
              Staging Deployment in Progress
            </span>
          )}
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-5 py-2.5 text-xs font-medium text-[#8E8C94] hover:text-white"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}