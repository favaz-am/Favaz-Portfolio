"use client";

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/favaz-am" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/favaz-am" },
  { name: "Twitter", href: "https://x.com/Favaz__AM" },
  { name: "Instagram", href: "https://www.instagram.com/favaz.am" },
];

export default function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-glow" aria-hidden="true" />

      <div className="contact-container">
        {/* Heading */}
        <h2 className="contact-name">MUHAMMED FAVAZ AM</h2>

        {/* Footer Grid */}
        <div className="contact-grid">
          {/* Column 1: Email & Location */}
          <div className="contact-col">
            <div className="contact-info-block">
              <span className="contact-label">Email</span>
              <a href="mailto:favazam98@gmail.com" className="contact-value contact-email">
                favazam98@gmail.com
              </a>
            </div>

            <div className="contact-info-block">
              <span className="contact-label">Location</span>
              <p className="contact-value">Kerala, India</p>
            </div>
          </div>

          {/* Column 2: Social Links */}
          <div className="contact-col">
            <span className="contact-label">Social</span>
            <ul className="contact-social-list">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.name} className="contact-social-item">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <span>{item.name}</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Credits & Copyright */}
          <div className="contact-col contact-credits">
            <p className="contact-credit-text">
              Designed and Developed
              <br />
              by <span className="contact-accent">Muhammed Favaz AM</span>
            </p>
            <p className="contact-copyright">© 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}