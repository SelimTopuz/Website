export interface ParsedTimelinePeriod {
  label: string;
  startYear: number;
  endYear: number | null;
  durationYears: number;
}

const CURRENT_YEAR = new Date().getFullYear();

function parseEndYear(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === "–" || trimmed === "-") {
    return null;
  }

  const yearMatch = trimmed.match(/\d{4}/);
  return yearMatch ? Number(yearMatch[0]) : null;
}

export function parseTimelinePeriod(period: string): ParsedTimelinePeriod {
  const normalized = period.replace(/\s+/g, " ").trim();
  const [startPart, endPart] = normalized.split(/\s*[–-]\s*/);

  const startMatch = startPart.match(/\d{4}/);
  const startYear = startMatch ? Number(startMatch[0]) : CURRENT_YEAR;
  const endYear = parseEndYear(endPart);
  const effectiveEnd = endYear ?? CURRENT_YEAR;
  const durationYears = Math.max(1, effectiveEnd - startYear + 1);

  return {
    label: normalized,
    startYear,
    endYear,
    durationYears,
  };
}
