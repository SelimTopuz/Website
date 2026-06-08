import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { DetailMedia } from "../components/DetailMedia";
import { getProjectModelsBySlug } from "../data/fastgateModels";
import { scrollToSection } from "../utils/scroll";

export default function ProjectModelsPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const page = getProjectModelsBySlug(slug);

  useEffect(() => {
    const anchorId = location.hash.slice(1);
    if (!anchorId) return;

    requestAnimationFrame(() => {
      scrollToSection(anchorId, { updateHash: false });
    });
  }, [location.pathname, location.hash]);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to={page.backHref}
        className="text-sm font-medium text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]"
      >
        {page.backLabel}
      </Link>

      <header className="mt-6 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          {page.title}
        </h1>
      </header>

      <div className="space-y-12 pt-8">
        {page.groups.map((group) => (
          <section
            key={group.ap}
            id={group.ap.toLowerCase()}
            tabIndex={-1}
            className="scroll-mt-8 space-y-4 outline-none"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                {group.ap}
              </p>
              <h2 className="text-xl font-semibold text-[var(--color-text)] sm:text-2xl">
                {group.subsystem}
              </h2>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                {group.summary}
              </p>
            </div>

            <div className="space-y-8">
              {group.diagrams.map((diagram) => (
                <div key={diagram.title} className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--color-text)]">
                    {diagram.title}
                  </h3>
                  <DetailMedia media={diagram.media} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
