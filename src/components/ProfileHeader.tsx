import { profile } from "../data/profile";
import { SocialIcon } from "./ContentBlocks";

const AVATAR_FRAME_CLASS = "h-48 w-48 sm:h-56 sm:w-56";

export default function ProfileHeader() {
  const avatarSrc = profile.avatarUrl ?? "/profile-placeholder.svg";

  return (
    <header
      id="top"
      className="mx-auto max-w-3xl px-4 pt-12 pb-8 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <div
          className={`relative shrink-0 overflow-hidden rounded-full ${AVATAR_FRAME_CLASS}`}
        >
          <img
            src={avatarSrc}
            srcSet={
              profile.avatarUrl ? `${profile.avatarUrl} 1024w` : undefined
            }
            sizes="(min-width: 640px) 14rem, 12rem"
            alt={`Profilfoto von ${profile.name}`}
            width={448}
            height={336}
            decoding="async"
            fetchPriority="high"
            className="absolute -top-[3%] left-1/2 h-[108%] w-auto max-w-none min-w-[108%] -translate-x-1/2 object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-[var(--color-text-muted)] italic">
            {profile.tagline}
          </p>

          <nav aria-label="Social Links" className="mt-5">
            <ul className="flex flex-wrap gap-2">
              {profile.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target={
                      link.url.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      link.url.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={link.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-icon-bg)] text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-link)]"
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <hr className="mt-8 border-[var(--color-border)]" />
    </header>
  );
}
