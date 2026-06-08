import { useId } from "react";
import { Link, useHref } from "react-router-dom";

export const FASTGATE_MODELS_PATH = "/projekte/fastgate/models";

interface FastGateArbeitspaketeDiagramProps {
  modelsPagePath?: string;
  caption?: string;
}

const FONT = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

/** Minimum body size — matches AP2 „Wahrnehmung des Vorfelds“. */
const MIN_BODY_FONT = 12;
const TITLE_FONT = 14;

interface TextLineSpec {
  text: string;
  fontSize: number;
  fontWeight?: number;
}

function renderCenteredLines(
  cx: number,
  boxY: number,
  boxHeight: number,
  lines: TextLineSpec[],
  keyPrefix: string,
  lineGap = 4,
) {
  const totalHeight =
    lines.reduce((sum, line) => sum + line.fontSize, 0) +
    lineGap * Math.max(0, lines.length - 1);
  let cursor = boxY + (boxHeight - totalHeight) / 2;

  return lines.map((line, index) => {
    const lineY = cursor + line.fontSize / 2;
    cursor += line.fontSize + lineGap;

    return (
      <text
        key={`${keyPrefix}-${index}`}
        x={cx}
        y={lineY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#1a1a1a"
        fontSize={line.fontSize}
        fontWeight={line.fontWeight ?? 400}
        fontFamily={FONT}
        pointerEvents="none"
      >
        {line.text}
      </text>
    );
  });
}

interface ApBannerLabelProps {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  title: string;
  subtitle: string;
}

function ApBannerLabel({
  label,
  x,
  y,
  width,
  height,
  fill,
  title,
  subtitle,
}: ApBannerLabelProps) {
  return (
    <g role="group" aria-label={label}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={7}
        fill={fill}
        stroke="#888"
        strokeWidth={0.75}
        pointerEvents="none"
      />
      {renderCenteredLines(
        x + width / 2,
        y,
        height,
        [
          { text: title, fontSize: TITLE_FONT, fontWeight: 700 },
          { text: subtitle, fontSize: MIN_BODY_FONT, fontWeight: 400 },
        ],
        label,
        5,
      )}
    </g>
  );
}

interface ApBoxProps {
  to: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke?: string;
  lines: string[];
  titleSize?: number;
  bodySize?: number;
  /** Number of leading lines rendered as bold title (default 1). */
  titleLineCount?: number;
  lineGap?: number;
}

function ApBox({
  to,
  label,
  x,
  y,
  width,
  height,
  fill,
  stroke = "#777",
  lines,
  titleSize = TITLE_FONT,
  bodySize = MIN_BODY_FONT,
  titleLineCount = 1,
  lineGap = 5,
}: ApBoxProps) {
  const clipId = useId();
  const lineSpecs: TextLineSpec[] = lines.map((text, index) => ({
    text,
    fontSize: index < titleLineCount ? titleSize : bodySize,
    fontWeight: index < titleLineCount ? 700 : 400,
  }));

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={width} height={height} rx={7} />
        </clipPath>
      </defs>
      <Link
        to={to}
        aria-label={label}
        className="group/ap cursor-pointer"
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={7}
          fill={fill}
          stroke={stroke}
          strokeWidth={0.75}
          className="transition-[filter,stroke-width] group-hover/ap:brightness-[0.98] group-focus-visible/ap:stroke-[var(--color-link)] group-focus-visible/ap:stroke-[2]"
        />
        <g clipPath={`url(#${clipId})`} pointerEvents="none">
          {renderCenteredLines(
            x + width / 2,
            y,
            height,
            lineSpecs,
            label,
            lineGap,
          )}
        </g>
      </Link>
    </g>
  );
}

function FlowArrow({
  d,
  variant = "dark",
  bidirectional = false,
}: {
  d: string;
  variant?: "dark" | "light";
  bidirectional?: boolean;
}) {
  const stroke = variant === "dark" ? "#404040" : "#a3a3a3";
  const width = variant === "dark" ? 3.25 : 2.25;
  const marker =
    variant === "dark" ? "url(#ap-arrow-dark)" : "url(#ap-arrow-light)";

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={marker}
      markerStart={bidirectional ? marker : undefined}
      pointerEvents="none"
    />
  );
}

export function FastGateArbeitspaketeDiagram({
  modelsPagePath = FASTGATE_MODELS_PATH,
  caption,
}: FastGateArbeitspaketeDiagramProps) {
  const ap2Href = useHref(`${modelsPagePath}#ap2`);
  const ap3Href = useHref(`${modelsPagePath}#ap3`);
  const ap4Href = useHref(`${modelsPagePath}#ap4`);
  const ap5Href = useHref(`${modelsPagePath}#ap5`);
  const hubX = 248;
  const hubY = 108;
  const hubPad = 10;
  const subBoxW = 224;
  const subBoxH = 86;
  const subBoxGap = 12;
  const rowGap = 10;
  const innerW = subBoxW * 2 + subBoxGap;
  const hubW = innerW + hubPad * 2;
  const hubInnerX = hubX + hubPad;
  const subBoxTopY = hubY + hubPad;
  const subBoxBottomY = subBoxTopY + subBoxH + rowGap;
  const hubH = subBoxBottomY + subBoxH + hubPad - hubY;
  const hubRight = hubX + hubW;
  const subBoxRightX = hubInnerX + subBoxW + subBoxGap;
  const ap3CenterX = hubInnerX + subBoxW / 2;
  const metaCenterX = subBoxRightX + subBoxW / 2;
  const hubCenterX = hubInnerX + innerW / 2;
  const hubMidY = hubY + hubH / 2;
  const hubBottom = hubY + hubH;

  const apBannerX = 24;
  const apBannerW = 912;
  const ap6Y = 46;
  const apBannerH = 48;

  const ap4X = apBannerX;
  const ap4W = 168;

  const itBoxH = 40;
  const itBoxX = ap3CenterX;
  const itBoxW = metaCenterX - ap3CenterX;

  const ap2GapToIt = 32;
  const hubToAp2Gap = 36;
  const ap2H = 72;
  const ap2X = ap4X;
  const ap2W = itBoxX - ap2X - ap2GapToIt;
  const ap2Y = hubBottom + hubToAp2Gap;
  const ap2CenterX = ap2X + ap2W / 2;
  const ap2ArrowX = ap2X + ap2W - 36;
  const itBoxY = ap2Y;
  const itBoxCenterX = (ap3CenterX + metaCenterX) / 2;
  const itArrowInset = itBoxW * 0.28;
  const itArrowLeftX = itBoxCenterX - itArrowInset;
  const itArrowRightX = itBoxCenterX + itArrowInset;
  const ap3Bottom = subBoxBottomY + subBoxH;
  const ap4Y = hubY;
  const ap4H = ap3Bottom - ap4Y;
  const ap4Right = ap4X + ap4W;
  const ap4ArrowEndX = hubInnerX;
  const ap4ArrowToYellowY = subBoxTopY + subBoxH / 2;
  const ap4ArrowToAp3Y = subBoxBottomY + subBoxH / 2;

  const apBannerGap = hubY - (ap6Y + apBannerH);
  const ap1Y = ap2Y + ap2H + apBannerGap;

  const ap5W = 168;
  const ap5H = 138;
  const ap5X = apBannerX + apBannerW - ap5W;
  const ap5Y = 164;

  return (
    <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
      <svg
        viewBox="0 0 960 540"
        role="img"
        aria-labelledby="ap-diagram-title"
        className="h-auto w-full"
      >
        <defs>
          <marker
            id="ap-arrow-dark"
            viewBox="0 0 10 10"
            refX={8.5}
            refY={5}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
          >
            <path d="M 1 1 L 9 5 L 1 9 Z" fill="#404040" />
          </marker>
          <marker
            id="ap-arrow-light"
            viewBox="0 0 10 10"
            refX={8.5}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 1 1 L 9 5 L 1 9 Z" fill="#a3a3a3" />
          </marker>
        </defs>

        <title id="ap-diagram-title">
          Zusammenhänge der Arbeitspakete AP1 bis AP6 im FastGate-Projekt
        </title>

        <rect x={0} y={0} width={960} height={540} fill="#fafafa" />

        <text
          x={480}
          y={32}
          textAnchor="middle"
          fill="#2a2a2a"
          fontSize={18}
          fontWeight={700}
          fontFamily={FONT}
          letterSpacing={2}
        >
          ZUSAMMENHÄNGE DER ARBEITSPAKETE
        </text>

        <ApBannerLabel
          label="AP6 – Technologieakzeptanz und Transfer"
          x={apBannerX}
          y={ap6Y}
          width={apBannerW}
          height={apBannerH}
          fill="#CABDE8"
          title="AP6 – Technologieakzeptanz und Transfer"
          subtitle="Akzeptanz, Breitentransfer, Tiefentransfer"
        />

        <ApBannerLabel
          label="AP1 – Autonome Airport Operation Systeme"
          x={apBannerX}
          y={ap1Y}
          width={apBannerW}
          height={apBannerH}
          fill="#D9D9D9"
          title="AP1 – Autonome Airport Operation Systeme"
          subtitle="Potentialanalyse, Informationsarchitektur etc."
        />

        {/* Central platform */}
        <rect
          x={hubX}
          y={hubY}
          width={hubW}
          height={hubH}
          rx={7}
          fill="#E8F4F5"
          stroke="#7FA8AD"
          strokeWidth={2}
          pointerEvents="none"
        />
        {renderCenteredLines(
          metaCenterX,
          subBoxTopY,
          subBoxH,
          [
            {
              text: "Zentrale Datenplattform",
              fontSize: 13,
              fontWeight: 600,
            },
          ],
          "zentrale-datenplattform",
        )}

        <rect
          x={hubInnerX}
          y={subBoxTopY}
          width={subBoxW}
          height={subBoxH}
          rx={5}
          fill="#FFE599"
          stroke="#C9A227"
          strokeWidth={0.75}
          pointerEvents="none"
        />
        {renderCenteredLines(
          hubInnerX + subBoxW / 2,
          subBoxTopY,
          subBoxH,
          [
            { text: "Verhaltensmodelle", fontSize: MIN_BODY_FONT, fontWeight: 600 },
            { text: "etc.", fontSize: MIN_BODY_FONT },
            { text: "System-Spezifik", fontSize: MIN_BODY_FONT },
          ],
          "verhaltensmodelle",
          4,
        )}

        <rect
          x={subBoxRightX}
          y={subBoxBottomY}
          width={subBoxW}
          height={subBoxH}
          rx={5}
          fill="#E6E6E6"
          stroke="#999"
          strokeWidth={0.75}
          pointerEvents="none"
        />
        {renderCenteredLines(
          subBoxRightX + subBoxW / 2,
          subBoxBottomY,
          subBoxH,
          [
            { text: "Meta-Informationen", fontSize: MIN_BODY_FONT, fontWeight: 600 },
            { text: "Flugzeiten, Wetter", fontSize: MIN_BODY_FONT },
            { text: "etc.", fontSize: MIN_BODY_FONT },
          ],
          "meta-info",
          4,
        )}

        {/* AP4 ↔ Verhaltensmodelle (gelb) & AP3 */}
        <FlowArrow
          d={`M ${ap4Right} ${ap4ArrowToYellowY} L ${ap4ArrowEndX} ${ap4ArrowToYellowY}`}
          bidirectional
        />
        <FlowArrow
          d={`M ${ap4Right} ${ap4ArrowToAp3Y} L ${ap4ArrowEndX} ${ap4ArrowToAp3Y}`}
          bidirectional
        />

        {/* AP2 → AP3 */}
        <FlowArrow
          d={`M ${ap2ArrowX} ${ap2Y} L ${ap2ArrowX} ${ap3Bottom}`}
        />

        {/* platform → AP5 */}
        <FlowArrow d={`M ${hubRight} ${hubMidY} L ${ap5X} ${hubMidY}`} />

        {/* IT systems → platform */}
        <FlowArrow
          d={`M ${itArrowLeftX} ${itBoxY} L ${itArrowLeftX} ${ap3Bottom}`}
          variant="light"
        />
        <FlowArrow
          d={`M ${itArrowRightX} ${itBoxY} L ${itArrowRightX} ${ap3Bottom}`}
          variant="light"
        />

        <rect
          x={itBoxX}
          y={itBoxY}
          width={itBoxW}
          height={itBoxH}
          rx={5}
          fill="#E6E6E6"
          stroke="#999"
          strokeWidth={0.75}
          pointerEvents="none"
        />
        {renderCenteredLines(
          itBoxCenterX,
          itBoxY,
          itBoxH,
          [
            { text: "Flughafen IT-", fontSize: MIN_BODY_FONT, fontWeight: 600 },
            { text: "Systeme etc.", fontSize: MIN_BODY_FONT, fontWeight: 600 },
          ],
          "flughafen-it",
          4,
        )}

        {/* Click targets on top so arrows/labels do not block hits (esp. AP4). */}
        <ApBox
          to={ap4Href}
          label="AP4 – High-Driving Automation"
          x={ap4X}
          y={ap4Y}
          width={ap4W}
          height={ap4H}
          fill="#F9CB9C"
          stroke="#D6A066"
          lines={[
            "AP4 – High-Driving",
            "Automation",
            "Autonome Systeme,",
            "exemplarisch",
            "Automation der",
            "Fluggastbrücke",
          ]}
          titleLineCount={2}
          lineGap={4}
        />

        <ApBox
          to={ap3Href}
          label="AP3 – HD-Mapping / Zentrale Datenplattform"
          x={hubInnerX}
          y={subBoxBottomY}
          width={subBoxW}
          height={subBoxH}
          fill="#A2C4C9"
          stroke="#6A9499"
          lines={[
            "AP3 – HD-Mapping",
            "Karten-/Geograf./",
            "Lageinformationen",
            "etc.",
          ]}
          lineGap={4}
        />

        <ApBox
          to={ap2Href}
          label="AP2 – Robuste Sensorik"
          x={ap2X}
          y={ap2Y}
          width={ap2W}
          height={ap2H}
          fill="#B6D7A8"
          stroke="#7BA86C"
          lines={["AP2 – Robuste Sensorik", "Wahrnehmung des Vorfelds"]}
        />

        <ApBox
          to={ap5Href}
          label="AP5 – Digitaler Zwilling"
          x={ap5X}
          y={ap5Y}
          width={ap5W}
          height={ap5H}
          fill="#9FC5E8"
          stroke="#6A9FC4"
          lines={[
            "AP5 – Digitaler",
            "Zwilling",
            "u.a. immersive",
            "Visualisierung",
            "für Überwachungs-",
            "und",
            "Trainingszwecke",
          ]}
          titleLineCount={2}
          lineGap={4}
        />
      </svg>

      {caption && (
        <figcaption className="space-y-1 px-3 py-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <span className="block">{caption}</span>
          <span className="block text-xs text-[var(--color-text-muted)]/80">
            Auf AP2 bis AP5 klicken, um zur Detailseite der Subsystem-Modelle
            zu springen.
          </span>
        </figcaption>
      )}
    </figure>
  );
}
