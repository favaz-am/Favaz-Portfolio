"use client";

import Link from "next/link";

interface WorkImageProps {
  image: string;
  alt: string;
  link?: string;
}

export default function WorkImage({ image, alt, link }: WorkImageProps) {
  const isExternal = Boolean(link && !link.startsWith("/"));

  const content = (
    <>
      <div className="work-link" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
      <img src={image} alt={alt} loading="lazy" decoding="async" className="mywork-img" />
    </>
  );

  return (
    <div className="work-image">
      {link ? (
        isExternal ? (
          <a
            className="work-image-in"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
          >
            {content}
          </a>
        ) : (
          <Link className="work-image-in" href={link} data-cursor="disable">
            {content}
          </Link>
        )
      ) : (
        <div className="work-image-in" data-cursor="disable">
          {content}
        </div>
      )}
    </div>
  );
}