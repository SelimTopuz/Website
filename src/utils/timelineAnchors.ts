function slugifyAnchorPart(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildModuleAnchorParts(
  entryTitle: string,
  moduleTitle: string,
  groupTitle?: string,
): string[] {
  return groupTitle
    ? [entryTitle, groupTitle, moduleTitle]
    : [entryTitle, moduleTitle];
}

export function timelineModuleAnchorId(
  entryTitle: string,
  moduleTitle: string,
  groupTitle?: string,
): string {
  return `timeline-module-${slugifyAnchorPart(
    buildModuleAnchorParts(entryTitle, moduleTitle, groupTitle).join("-"),
  )}`;
}

export function timelineModuleAnchorUrl(
  entryTitle: string,
  moduleTitle: string,
  groupTitle?: string,
): string {
  return `#${timelineModuleAnchorId(entryTitle, moduleTitle, groupTitle)}`;
}

export function timelineEntryAnchorId(entryTitle: string): string {
  return `timeline-entry-${slugifyAnchorPart(entryTitle)}`;
}

export function timelineEntryAnchorUrl(entryTitle: string): string {
  return `#${timelineEntryAnchorId(entryTitle)}`;
}

export function isTimelineAnchorLink(url: string): boolean {
  return url.startsWith("#timeline-");
}

export function timelineAnchorIdFromUrl(url: string): string | null {
  if (!isTimelineAnchorLink(url)) return null;
  return url.slice(1);
}
