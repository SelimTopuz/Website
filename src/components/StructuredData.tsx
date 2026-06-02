import { profile } from "../data/profile";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: profile.tagline,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: profile.location,
    },
    url: profile.siteUrl,
    sameAs: profile.socialLinks
      .filter((link) => !link.url.startsWith("mailto:"))
      .map((link) => link.url),
    image: profile.avatarUrl ?? `${profile.siteUrl}/profile-placeholder.svg`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
