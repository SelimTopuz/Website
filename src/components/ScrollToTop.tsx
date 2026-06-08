import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scheduleScrollToSection } from "../utils/scroll";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const anchorId = hash.slice(1);

    if (!anchorId) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "instant",
      });
      return;
    }

    return scheduleScrollToSection(anchorId, { updateHash: false });
  }, [pathname, hash]);

  return null;
}
