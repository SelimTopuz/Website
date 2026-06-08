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

const HASH_SCROLL_RETRY_DELAYS_MS = [50, 150, 400] as const;

/** Scrolls to a section and retries while layout or media may still be settling. */
export function scheduleScrollToSection(
  id: string,
  options?: { behavior?: ScrollBehavior; updateHash?: boolean },
): () => void {
  let cancelled = false;

  const attempt = () => {
    if (cancelled) return;
    scrollToSection(id, options);
  };

  attempt();
  const frameId = requestAnimationFrame(attempt);

  const timeouts = HASH_SCROLL_RETRY_DELAYS_MS.map((delay) =>
    window.setTimeout(attempt, delay),
  );

  const element = document.getElementById(id);
  const media = element?.querySelectorAll("img, video") ?? [];
  const onMediaLoad = () => attempt();

  media.forEach((node) => {
    if (node instanceof HTMLImageElement && !node.complete) {
      node.addEventListener("load", onMediaLoad, { once: true });
    }
    if (node instanceof HTMLVideoElement && node.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      node.addEventListener("loadeddata", onMediaLoad, { once: true });
    }
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(frameId);
    timeouts.forEach(clearTimeout);
    media.forEach((node) => {
      node.removeEventListener("load", onMediaLoad);
      node.removeEventListener("loadeddata", onMediaLoad);
    });
  };
}
