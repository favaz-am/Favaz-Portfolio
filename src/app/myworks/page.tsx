import Link from "next/link";
import { PROJECTS } from "@/data/projects";

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #2b1015 0%, #5c1922 50%, #141218 100%)",
  "linear-gradient(135deg, #161829 0%, #3b1d2e 55%, #0f0e14 100%)",
  "linear-gradient(135deg, #1f1216 0%, #4a151b 50%, #100f14 100%)",
];

export default function AllWorksPage() {
  return (
    <main className="allworks-page">
      <div className="allworks-container">
        <div className="allworks-nav">
          <Link href="/" className="allworks-back-btn">
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>

        <header className="allworks-header">
          <h1 className="allworks-title">
            All <span className="mywork-accent">Works</span>
          </h1>
          <p className="allworks-subtitle">
            A collection of all my projects and creations
          </p>
        </header>

        <div className="allworks-grid">
          {PROJECTS.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            const linkHref = project.liveUrl || project.githubUrl || "#";
            const bgGradient =
              project.gradient ||
              FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

            return (
              <a
                key={project.id}
                href={linkHref}
                target={linkHref !== "#" ? "_blank" : undefined}
                rel={linkHref !== "#" ? "noopener noreferrer" : undefined}
                className="allworks-card"
              >
                <div
                  className="allworks-thumb"
                  style={{ background: bgGradient }}
                >
                  <span className="allworks-badge">{num}</span>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="allworks-img"
                    />
                  ) : (
                    <div className="mywork-placeholder">
                      <span className="mywork-placeholder-tag">
                        {project.statusLabel}
                      </span>
                      <h3 className="mywork-placeholder-title">
                        {project.title}
                      </h3>
                    </div>
                  )}
                </div>

                <div className="allworks-body">
                  <h2 className="allworks-card-title">{project.title}</h2>
                  <p className="allworks-card-cat">{project.category}</p>
                  <p className="allworks-card-desc">{project.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}