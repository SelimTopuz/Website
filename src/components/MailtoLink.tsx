import { useState, type ReactNode } from "react";

interface MailtoLinkProps {
  email: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function MailtoLink({
  email,
  className,
  children,
  ariaLabel,
}: MailtoLinkProps) {
  const [copied, setCopied] = useState(false);
  const href = `mailto:${email}`;

  const handleClick = () => {
    void navigator.clipboard.writeText(email).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      },
      () => {
        window.location.href = href;
      },
    );
  };

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel ?? `E-Mail an ${email}`}
      title={copied ? "E-Mail-Adresse kopiert" : email}
      onClick={handleClick}
    >
      {children}
      <span className="sr-only" aria-live="polite">
        {copied ? "E-Mail-Adresse in die Zwischenablage kopiert" : ""}
      </span>
    </a>
  );
}

export function emailFromMailto(url: string): string | null {
  if (!url.startsWith("mailto:")) return null;
  return url.slice("mailto:".length).split("?")[0] || null;
}
