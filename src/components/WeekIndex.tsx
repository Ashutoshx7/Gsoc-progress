import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './WeekIndex.css';

type IndexLink = {
  id: string;
  title: string;
};

export function WeekIndex() {
  const location = useLocation();
  const [links, setLinks] = useState<IndexLink[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const readLinks = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-index-title][id]'),
      ).map((section) => ({
        id: section.id,
        title: section.dataset.indexTitle || section.id,
      }));

      setLinks(sections);
      setActiveId((current) => current && sections.some((item) => item.id === current)
        ? current
        : sections[0]?.id ?? null);

      return sections;
    };

    const sections = readLinks();
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: 0.1 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  if (links.length === 0) return null;

  return (
    <div className="week-index-shell" aria-label="Progress index">
      <nav className="week-index">
        <h3>Index</h3>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`week-index-link ${activeId === link.id ? 'is-current' : ''}`}
          >
            <span />
            {link.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
