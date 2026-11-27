import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function AllWorksPage() {
  return (
    <main className="allworks-page">
      <div className="allworks-container">
        <div className="allworks-nav">
          <Link href="/#projects" className="allworks-back-btn">
            ← Back to Portfolio
          </Link>
        </div>

        <header className="allworks-header">
          <h1 className="allworks-title">
            All <span className="mywork-accent">Works</span>
          </h1>
          <p className="allworks-subtitle">
            A complete collection of my web applications, 3D experiments, and utilities.
          </p>
        </header>

        <div className="allworks-grid">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="allworks-card"
            >
              <div className="allworks-thumb">
                <span className="allworks-badge">{project.num}</span>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="allworks-img"
                />
              </div>

              <div className="allworks-body">
                <h2 className="allworks-card-title">{project.title}</h2>
                <p className="allworks-card-cat">{project.category}</p>
                <p className="allworks-card-desc">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}