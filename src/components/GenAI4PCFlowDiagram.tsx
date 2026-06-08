import { useCallback, useEffect, useId, useState } from "react";

const FONT = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

export type GenAI4PCPhaseId =
  | "ingestion"
  | "concepts"
  | "session"
  | "question"
  | "answer";

type PhaseId = GenAI4PCPhaseId;

const PHASES: { id: PhaseId; label: string }[] = [
  { id: "ingestion", label: "Ingestion" },
  { id: "concepts", label: "Konzept & Aufgaben" },
  { id: "session", label: "Session" },
  { id: "question", label: "Frage" },
  { id: "answer", label: "Antwort" },
];

const PHASE_DESCRIPTIONS: Record<PhaseId, string> = {
  ingestion:
    "Datei → Dokumenten-Ingestion → Parse Document (LlamaParse/Vision) → Text + Bild-Metadaten zurück → Chunking & MiniLM-Embeddings → ChromaDB",
  concepts:
    "Workspace auswählen → Konzept- & Aufgaben-Gen. → Chunks aus ChromaDB laden → LLM-Gateway nutzen → Konzepte & Aufgaben generieren → in SQLite Database speichern",
  session:
    "thread/new → Chat-Sessions (WorkspaceThreadsService) legt threads-Eintrag in SQLite Database an",
  question:
    "Nutzerfrage → Retrieval & Prompt: relevante Chunks aus ChromaDB, Prompt-Aufbau → LLM-Gateway → OpenAI LLM → SSE Stream ans Frontend",
  answer:
    "Nutzerantwort → Retrieval & Prompt · ChromaDB & SQLite Database für Kontext → Antwortbewertung → LLM-Gateway → OpenAI LLM → Generiertes Feedback · SSE Stream ans Frontend",
};

interface GenAI4PCFlowDiagramProps {
  caption?: string;
  /** Render at full width inside lightbox. */
  variant?: "inline" | "lightbox";
  phase?: GenAI4PCPhaseId;
  onPhaseChange?: (phase: GenAI4PCPhaseId) => void;
}

interface NodeSpec {
  id: string;
  label: string;
  lines?: string[];
  /** Render all label lines in bold (backend modules). */
  bold?: boolean;
  x: number;
  y: number;
  width: number;
  height?: number;
  kind?: "process" | "store" | "external";
  fill: string;
  stroke: string;
  phases: PhaseId[];
}

interface EdgeLabelSpec {
  lines: string[];
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
}

interface EdgeSpec {
  id: string;
  d: string;
  phases: PhaseId[];
  dashed?: boolean;
  label?: EdgeLabelSpec;
}

const DIAGRAM_WIDTH = 1200;
const DIAGRAM_CENTER = DIAGRAM_WIDTH / 2;

const NODES: NodeSpec[] = [
  {
    id: "frontend",
    label: "Frontend",
    lines: ["Frontend", "React · Chat-UI"],
    x: DIAGRAM_CENTER - 190,
    y: 16,
    width: 380,
    height: 44,
    fill: "#C8E6C9",
    stroke: "#6B9B6E",
    phases: ["ingestion", "concepts", "session", "question", "answer"],
  },
  {
    id: "api",
    label: "API + SSE",
    lines: ["API + SSE", "FastAPI"],
    x: DIAGRAM_CENTER - 220,
    y: 78,
    width: 440,
    height: 44,
    fill: "#D4E8F7",
    stroke: "#5A8FB8",
    phases: ["ingestion", "concepts", "session", "question", "answer"],
  },
  {
    id: "ingestion",
    label: "Dokumenten-Ingestion",
    lines: ["Dokumenten-", "Ingestion"],
    bold: true,
    x: 40,
    y: 152,
    width: 160,
    height: 54,
    fill: "#E0F2F4",
    stroke: "#5A9AA3",
    phases: ["ingestion"],
  },
  {
    id: "content-gen",
    label: "Konzept- & Aufgaben-Gen.",
    lines: ["Konzept- &", "Aufgaben-Gen."],
    bold: true,
    x: 228,
    y: 152,
    width: 160,
    height: 54,
    fill: "#E8F4E4",
    stroke: "#6B9B5E",
    phases: ["concepts"],
  },
  {
    id: "session",
    label: "Chat-Sessions",
    lines: ["Chat-Sessions"],
    bold: true,
    x: 416,
    y: 152,
    width: 160,
    height: 54,
    fill: "#EDE4F7",
    stroke: "#8B72A8",
    phases: ["session"],
  },
  {
    id: "rag",
    label: "Retrieval & Prompt",
    lines: ["Retrieval &", "Prompt"],
    bold: true,
    x: 604,
    y: 152,
    width: 160,
    height: 54,
    fill: "#FFF0DC",
    stroke: "#C49252",
    phases: ["question", "answer"],
  },
  {
    id: "llm-gateway",
    label: "LLM-Gateway",
    lines: ["LLM-Gateway"],
    bold: true,
    x: 792,
    y: 152,
    width: 160,
    height: 54,
    fill: "#FFE8CC",
    stroke: "#C49252",
    phases: ["concepts", "question", "answer"],
  },
  {
    id: "evaluation",
    label: "Antwortbewertung",
    lines: ["Antwort-", "bewertung"],
    bold: true,
    x: 980,
    y: 152,
    width: 160,
    height: 54,
    fill: "#F8E0EC",
    stroke: "#B87A98",
    phases: ["answer"],
  },
  {
    id: "llamaparse",
    label: "LlamaParse",
    lines: ["LlamaParse"],
    x: 43,
    y: 278,
    width: 155,
    height: 52,
    kind: "external",
    fill: "#E8F0FA",
    stroke: "#6A8FB8",
    phases: ["ingestion"],
  },
  {
    id: "chroma",
    label: "ChromaDB",
    lines: ["ChromaDB"],
    x: 360,
    y: 278,
    width: 155,
    height: 52,
    kind: "store",
    fill: "#E8EEF4",
    stroke: "#7A8FA3",
    phases: ["ingestion", "concepts", "question", "answer"],
  },
  {
    id: "sqlite",
    label: "SQLite Database",
    lines: ["SQLite Database"],
    x: 590,
    y: 272,
    width: 260,
    height: 58,
    kind: "store",
    fill: "#E8EEF4",
    stroke: "#7A8FA3",
    phases: ["ingestion", "concepts", "session", "answer"],
  },
  {
    id: "openai",
    label: "OpenAI LLM",
    lines: ["OpenAI LLM"],
    x: 940,
    y: 278,
    width: 155,
    height: 52,
    kind: "external",
    fill: "#E8F0FA",
    stroke: "#6A8FB8",
    phases: ["concepts", "question", "answer"],
  },
];

const EDGES: EdgeSpec[] = [
  {
    id: "fe-api",
    d: `M ${DIAGRAM_CENTER} 60 L ${DIAGRAM_CENTER} 78`,
    phases: ["ingestion", "concepts", "session"],
  },
  {
    id: "api-ing",
    d: `M ${DIAGRAM_CENTER} 122 L ${DIAGRAM_CENTER} 138 L 120 138 L 120 152`,
    phases: ["ingestion"],
    label: { lines: ["Datei", "selected workspace"], x: 360, y: 116 },
  },
  {
    id: "ing-llama",
    d: "M 105 206 L 105 278",
    phases: ["ingestion"],
    label: {
      lines: ["Parse", "Document"],
      x: 88,
      y: 248,
      anchor: "end",
    },
  },
  {
    id: "llama-ing",
    d: "M 135 278 L 135 206",
    phases: ["ingestion"],
    label: {
      lines: ["Text + Bild", "Metadaten"],
      x: 142,
      y: 248,
      anchor: "start",
    },
  },
  {
    id: "ing-sqlite",
    d: "M 200 174 L 222 174 L 222 252 L 720 252 L 720 272",
    phases: ["ingestion"],
    label: { lines: ["document", "metadata"], x: 500, y: 228 },
  },
  {
    id: "ing-chroma",
    d: "M 200 184 L 212 184 L 212 262 L 437 262 L 437 278",
    phases: ["ingestion"],
    label: { lines: ["Chunks"], x: 324, y: 278 },
  },
  {
    id: "api-content",
    d: `M ${DIAGRAM_CENTER} 122 L ${DIAGRAM_CENTER} 138 L 308 138 L 308 152`,
    phases: ["concepts"],
    label: { lines: ["selected workspace"], x: 420, y: 125 },
  },
  {
    id: "content-chroma",
    d: "M 308 206 L 308 304 L 360 304",
    phases: ["concepts"],
    label: {
      lines: ["Chunks laden"],
      x: 316,
      y: 268,
      anchor: "start",
    },
  },
  {
    id: "content-sqlite",
    d: "M 330 206 L 330 248 L 700 248 L 700 272",
    phases: ["concepts"],
    label: { lines: ["generated concepts ·", "questions"], x: 540, y: 228 },
  },
  {
    id: "content-llm",
    d: "M 388 179 L 792 179",
    phases: ["concepts"],
    label: {
      lines: ["geladene chunks ·", "prompts"],
      x: 590,
      y: 156,
    },
  },
  {
    id: "llm-openai",
    d: "M 872 206 L 872 304 L 940 304",
    phases: ["concepts", "question", "answer"],
    label: { lines: ["OpenAI LLM", "request"], x: 906, y: 276 },
  },
  {
    id: "api-session",
    d: `M ${DIAGRAM_CENTER} 122 L ${DIAGRAM_CENTER} 138 L 496 138 L 496 152`,
    phases: ["session"],
    label: {
      lines: ["new workspace/chats/", "knowledgeCheck"],
      x: 548,
      y: 118,
      anchor: "end",
    },
  },
  {
    id: "session-sqlite",
    d: "M 496 206 L 496 248 L 720 248 L 720 272",
    phases: ["session"],
    label: { lines: ["record"], x: 600, y: 236 },
  },
  {
    id: "api-rag",
    d: "M 500 122 L 500 179 L 604 179",
    phases: ["question"],
    label: { lines: ["Nutzerfrage"], x: 552, y: 166 },
  },
  {
    id: "rag-chroma",
    d: "M 437 278 L 437 252 L 684 252 L 684 206",
    phases: ["question", "answer"],
    label: { lines: ["relevante", "Chunks"], x: 548, y: 272 },
  },
  {
    id: "rag-sqlite",
    d: "M 730 272 L 730 248 L 710 248 L 710 206",
    phases: ["answer"],
    label: {
      lines: ["ausgewählte Aufgabe &", "relevante Konzepte"],
      x: 778,
      y: 232,
    },
  },
  {
    id: "rag-llm",
    d: "M 764 179 L 792 179",
    phases: [],
  },
  {
    id: "rag-eval",
    d: "M 684 152 L 684 134 L 1060 134 L 1060 152",
    phases: ["answer"],
    label: {
      lines: ["relevante Konzepte + Chunks +", "Nutzerantwort"],
      x: 872,
      y: 122,
    },
  },
  {
    id: "api-eval",
    d: "M 500 122 L 500 179 L 604 179",
    phases: ["answer"],
    label: { lines: ["Nutzerantwort"], x: 552, y: 166 },
  },
  {
    id: "eval-llm",
    d: "M 980 179 L 952 179",
    phases: ["answer"],
  },
  {
    id: "openai-eval",
    d: "M 1017 278 L 1017 262 L 1060 262 L 1060 206",
    phases: ["answer"],
    label: {
      lines: ["Generiertes Feedback"],
      x: 1068,
      y: 234,
      anchor: "start",
    },
  },
  {
    id: "api-fe-sse",
    d: "M 720 100 L 1120 100 L 1120 38 L 700 38",
    phases: ["question", "answer"],
    label: { lines: ["SSE Stream"], x: 940, y: 85 },
  },
];

function isNodeActive(node: NodeSpec, phase: PhaseId): boolean {
  return node.phases.includes(phase);
}

function isEdgeActive(edge: EdgeSpec, phase: PhaseId): boolean {
  return edge.phases.includes(phase);
}

function measureEdgeLabelBox(lines: string[]) {
  const maxChars = Math.max(...lines.map((line) => line.length));
  const fontSize = maxChars > 14 ? 8 : 9;
  const lineHeight = 11;
  const paddingX = 5;
  const paddingY = 3;
  const charWidth = fontSize * 0.58;
  const maxLineWidth = Math.max(...lines.map((line) => line.length * charWidth));
  return {
    width: maxLineWidth + paddingX * 2,
    height: lines.length * lineHeight + paddingY * 2,
    fontSize,
    lineHeight,
    paddingY,
  };
}

function FlowEdgeLabel({
  label,
  active,
  dashed = false,
}: {
  label: EdgeLabelSpec;
  active: boolean;
  dashed?: boolean;
}) {
  if (!active) return null;

  const { width, height, fontSize, lineHeight, paddingY } =
    measureEdgeLabelBox(label.lines);
  const anchor = label.anchor ?? "middle";
  const boxX =
    anchor === "start"
      ? label.x
      : anchor === "end"
        ? label.x - width
        : label.x - width / 2;
  const boxY = label.y - height / 2;
  const textX = boxX + width / 2;

  return (
    <g pointerEvents="none">
      <rect
        x={boxX}
        y={boxY}
        width={width}
        height={height}
        rx={4}
        fill="#ffffff"
        fillOpacity={0.95}
        stroke={dashed ? "#d1d5db" : "#e5e7eb"}
        strokeWidth={0.75}
      />
      {label.lines.map((line, index) => (
        <text
          key={`${label.x}-${label.y}-${index}`}
          x={textX}
          y={boxY + paddingY + lineHeight / 2 + index * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={dashed ? "#6b7280" : "#1f3a5f"}
          fontSize={fontSize}
          fontWeight={500}
          fontFamily={FONT}
          fontStyle={dashed ? "italic" : "normal"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function FlowArrow({
  d,
  active,
  dashed = false,
}: {
  d: string;
  active: boolean;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={active ? "#2563eb" : "#b8b8b8"}
      strokeWidth={active ? 2.5 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "6 4" : undefined}
      markerEnd={
        active
          ? "url(#genai-flow-arrow-active)"
          : "url(#genai-flow-arrow-inactive)"
      }
      opacity={active ? 1 : 0.3}
      pointerEvents="none"
    />
  );
}

const NODE_FONT_SIZE = 10;
const NODE_LINE_HEIGHT = 13;

function FlowNode({ node, active }: { node: NodeSpec; active: boolean }) {
  const h = node.height ?? 38;
  const isStore = node.kind === "store";
  const isExternal = node.kind === "external";
  const textLines = node.lines ?? [node.label];
  const isBold = node.bold ?? false;
  const textBlockHeight = textLines.length * NODE_LINE_HEIGHT;
  const startY = node.y + (h - textBlockHeight) / 2 + NODE_LINE_HEIGHT / 2;

  return (
    <g opacity={active ? 1 : 0.28}>
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={h}
        rx={isStore || isExternal ? 8 : 7}
        fill={node.fill}
        stroke={active ? node.stroke : "#b0b0b0"}
        strokeWidth={active ? 1.25 : 0.75}
      />
      {textLines.map((line, index) => (
        <text
          key={`${node.id}-${index}`}
          x={node.x + node.width / 2}
          y={startY + index * NODE_LINE_HEIGHT}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={active ? "#1a1a1a" : "#6a6a6a"}
          fontSize={NODE_FONT_SIZE}
          fontWeight={isBold ? 700 : 600}
          fontFamily={FONT}
          pointerEvents="none"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function PhaseTabs({
  phase,
  onPhaseChange,
  tablistId,
  compact = false,
}: {
  phase: PhaseId;
  onPhaseChange: (phase: PhaseId) => void;
  tablistId: string;
  compact?: boolean;
}) {
  return (
    <div
      role="tablist"
      aria-label="Pipeline-Phasen"
      id={tablistId}
      className={[
        "flex flex-wrap gap-1.5",
        compact ? "px-2 pt-2" : "border-b border-[var(--color-border)] pb-0",
      ].join(" ")}
    >
      {PHASES.map((item) => {
        const isActive = item.id === phase;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${tablistId}-${item.id}-tab`}
            aria-selected={isActive}
            aria-controls={`${tablistId}-${item.id}-panel`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onPhaseChange(item.id)}
            className={[
              compact
                ? "rounded-md px-2.5 py-1.5 text-xs font-medium sm:text-[13px]"
                : "-mb-px rounded-t-md px-3 py-2 text-sm font-medium sm:px-4 sm:text-[15px]",
              "transition-colors",
              isActive
                ? compact
                  ? "bg-[var(--color-link)] text-white"
                  : "border border-b-0 border-[var(--color-border)] bg-white text-[var(--color-text)]"
                : compact
                  ? "bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  : "border border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            ].join(" ")}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function FlowDiagramSvg({
  titleId,
  phase,
  descriptionId,
  enlarged = false,
}: {
  titleId: string;
  phase: PhaseId;
  descriptionId: string;
  enlarged?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_WIDTH} 360`}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      className={
        enlarged
          ? "h-auto w-full min-w-[min(96vw,1800px)]"
          : "h-auto w-full"
      }
    >
      <defs>
        <marker
          id="genai-flow-arrow-active"
          viewBox="0 0 10 10"
          refX={8.5}
          refY={5}
          markerWidth={6.5}
          markerHeight={6.5}
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 9 5 L 1 9 Z" fill="#2563eb" />
        </marker>
        <marker
          id="genai-flow-arrow-inactive"
          viewBox="0 0 10 10"
          refX={8.5}
          refY={5}
          markerWidth={5}
          markerHeight={5}
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 9 5 L 1 9 Z" fill="#b8b8b8" />
        </marker>
      </defs>

      <title id={titleId}>
        GenAI4PC Backend-Architektur: FastAPI mit sechs Modulen und
        Infrastrukturkomponenten
      </title>
      <desc id={descriptionId}>{PHASE_DESCRIPTIONS[phase]}</desc>

      <rect x={0} y={0} width={DIAGRAM_WIDTH} height={360} fill="#fafafa" />

      <rect
        x={20}
        y={140}
        width={DIAGRAM_WIDTH - 40}
        height={78}
        rx={8}
        fill="#f0f4f8"
        stroke="#c5cdd6"
        strokeWidth={1}
        pointerEvents="none"
      />
      <text
        x={20}
        y={134}
        fill="#4a5568"
        fontSize={11}
        fontWeight={600}
        fontFamily={FONT}
        pointerEvents="none"
      >
        FastAPI / Python — Backend-Module
      </text>

      {EDGES.map((edge) => (
        <FlowArrow
          key={edge.id}
          d={edge.d}
          active={isEdgeActive(edge, phase)}
          dashed={edge.dashed}
        />
      ))}

      {NODES.map((node) => (
        <FlowNode
          key={node.id}
          node={node}
          active={isNodeActive(node, phase)}
        />
      ))}

      {EDGES.map((edge) =>
        edge.label ? (
          <FlowEdgeLabel
            key={`${edge.id}-label`}
            label={edge.label}
            active={isEdgeActive(edge, phase)}
            dashed={edge.dashed}
          />
        ) : null,
      )}
    </svg>
  );
}

function FlowDiagramPanel({
  phase,
  onPhaseChange,
  titleId,
  tablistId,
  compactTabs = false,
  enlarged = false,
}: {
  phase: PhaseId;
  onPhaseChange: (phase: PhaseId) => void;
  titleId: string;
  tablistId: string;
  compactTabs?: boolean;
  enlarged?: boolean;
}) {
  const descriptionId = useId();

  return (
    <div className={enlarged ? "space-y-3" : "space-y-2"}>
      <PhaseTabs
        phase={phase}
        onPhaseChange={onPhaseChange}
        tablistId={tablistId}
        compact={compactTabs}
      />
      <p
        id={`${tablistId}-${phase}-panel`}
        role="tabpanel"
        aria-labelledby={`${tablistId}-${phase}-tab`}
        className={
          enlarged
            ? "px-1 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base"
            : "px-1 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm"
        }
      >
        {PHASE_DESCRIPTIONS[phase]}
      </p>
      <FlowDiagramSvg
        titleId={titleId}
        phase={phase}
        descriptionId={descriptionId}
        enlarged={enlarged}
      />
    </div>
  );
}

function FlowDiagramLightbox({
  onClose,
  caption,
  phase,
  onPhaseChange,
}: {
  onClose: () => void;
  caption?: string;
  phase: PhaseId;
  onPhaseChange: (phase: PhaseId) => void;
}) {
  const titleId = useId();
  const tablistId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Schließen
      </button>

      <figure
        className="flex max-h-full max-w-full flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="max-h-[94vh] w-[min(98vw,1900px)] overflow-auto rounded-lg bg-white p-3 shadow-2xl sm:p-5">
          <FlowDiagramPanel
            phase={phase}
            onPhaseChange={onPhaseChange}
            titleId={titleId}
            tablistId={tablistId}
            compactTabs
            enlarged
          />
        </div>
        {caption && (
          <figcaption className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/90">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export function GenAI4PCFlowDiagram({
  caption,
  variant = "inline",
  phase: controlledPhase,
  onPhaseChange,
}: GenAI4PCFlowDiagramProps) {
  const titleId = useId();
  const tablistId = useId();
  const [uncontrolledPhase, setUncontrolledPhase] =
    useState<PhaseId>("ingestion");
  const phase = controlledPhase ?? uncontrolledPhase;
  const setPhase = useCallback(
    (next: PhaseId) => {
      onPhaseChange?.(next);
      if (controlledPhase === undefined) {
        setUncontrolledPhase(next);
      }
    },
    [controlledPhase, onPhaseChange],
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  if (variant === "lightbox") {
    return (
      <FlowDiagramPanel
        phase={phase}
        onPhaseChange={setPhase}
        titleId={titleId}
        tablistId={tablistId}
      />
    );
  }

  const descriptionId = useId();

  return (
    <>
      <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
        <div className="space-y-2 px-2 pt-2 sm:px-3 sm:pt-3">
          <PhaseTabs
            phase={phase}
            onPhaseChange={setPhase}
            tablistId={tablistId}
          />
          <p
            id={`${tablistId}-${phase}-panel`}
            role="tabpanel"
            aria-labelledby={`${tablistId}-${phase}-tab`}
            className="px-1 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm"
          >
            {PHASE_DESCRIPTIONS[phase]}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full cursor-zoom-in bg-white px-2 pb-2 transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-link)] sm:px-3 sm:pb-3"
          aria-label="GenAI4PC Pipeline-Diagramm vergrößern"
        >
          <FlowDiagramSvg
            titleId={titleId}
            phase={phase}
            descriptionId={descriptionId}
          />
        </button>
        {caption && (
          <figcaption className="space-y-1 border-t border-[var(--color-border)] px-3 py-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            <span className="block">{caption}</span>
            <span className="block text-xs text-[var(--color-text-muted)]/80">
              Zum Vergrößern auf das Diagramm klicken
            </span>
          </figcaption>
        )}
      </figure>

      {lightboxOpen && (
        <FlowDiagramLightbox
          onClose={closeLightbox}
          caption={caption}
          phase={phase}
          onPhaseChange={setPhase}
        />
      )}
    </>
  );
}
