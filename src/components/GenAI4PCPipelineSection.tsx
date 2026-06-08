import { useState } from "react";
import { getGenAI4PCPhaseDetailParagraphs } from "../data/genai4pcPhaseTexts";
import {
  GenAI4PCFlowDiagram,
  type GenAI4PCPhaseId,
} from "./GenAI4PCFlowDiagram";

interface GenAI4PCPipelineSectionProps {
  caption?: string;
}

export function GenAI4PCPipelineSection({
  caption,
}: GenAI4PCPipelineSectionProps) {
  const [phase, setPhase] = useState<GenAI4PCPhaseId>("ingestion");

  return (
    <div className="space-y-3">
      <GenAI4PCFlowDiagram
        caption={caption}
        phase={phase}
        onPhaseChange={setPhase}
      />
      <div className="space-y-3" aria-live="polite">
        {getGenAI4PCPhaseDetailParagraphs(phase).map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="leading-relaxed text-[var(--color-text-muted)]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
