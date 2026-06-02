export function scrollToSection(
  id: string,
  options?: { behavior?: ScrollBehavior; updateHash?: boolean },
): void {
  const element = document.getElementById(id);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : (options?.behavior ?? "smooth"),
    block: "start",
  });

  element.focus({ preventScroll: true });

  if (options?.updateHash !== false && window.location.hash !== `#${id}`) {
    history.replaceState(null, "", `#${id}`);
  }
}
