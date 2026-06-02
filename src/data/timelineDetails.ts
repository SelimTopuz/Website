import type { DetailSectionMedia } from "../components/DetailMedia";
import { profile } from "./profile";
import type { TextSegment } from "./profile";

export interface TimelineDetailSection {
  title: string;
  paragraphs: TextSegment[][];
  listItems?: string[];
  media?: DetailSectionMedia;
}

const FASTGATE_PROJECT_URL =
  "https://innovationsflughafen.de/projekte/fastgate/";

export interface TimelineDetail {
  slug: string;
  title: string;
  period?: string;
  contextLabel: string;
  backAnchorId: string;
  projectUrl?: string;
  projectLinkLabel?: string;
  intro: TextSegment[][];
  sections: TimelineDetailSection[];
}

export const timelineDetails: TimelineDetail[] = [
  {
    slug: "fastgate",
    title: "FastGate",
    period: "01.12.2024 – 31.09.2025",
    contextLabel: "Advanced Systems Engineering · Wissenschaftliche Hilfskraft",
    backAnchorId: "timeline-module-wissenschaftliche-hilfskraft-ase-fastgate",
    projectUrl: FASTGATE_PROJECT_URL,
    projectLinkLabel: "Projektwebsite FastGate",
    intro: [
      [
        {
          type: "text",
          value: "Im Forschungsprojekt ",
        },
        {
          type: "link",
          label: "FastGate",
          url: FASTGATE_PROJECT_URL,
        },
        {
          type: "text",
          value:
            " habe ich das Vorfeld des Flughafens Paderborn/Lippstadt modelliert – als Systems Engineer in der ",
        },
        {
          type: "link",
          label: "Fachgruppe Advanced Systems Engineering",
          url: "https://www.hni.uni-paderborn.de/ase/",
        },
        {
          type: "text",
          value: " am Heinz Nixdorf Institut.",
        },
      ],
    ],
    sections: [
      {
        title: "Ziel des Projekts",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "FastGate adressiert die Steuerung und Koordination am Vorfeld des Flughafens Paderborn/Lippstadt. Ein durchgängiges Systemmodell sollte die Kommunikation zwischen den Arbeitspaketen und allen Beteiligten verbessern – von operativen Abläufen bis zu den beteiligten Akteuren. Hintergrund und Partner des Vorhabens sind auf der ",
            },
            {
              type: "link",
              label: "offiziellen Projektwebsite",
              url: FASTGATE_PROJECT_URL,
            },
            {
              type: "text",
              value: " beschrieben.",
            },
          ],
        ],
      },
      {
        title: "Meine Rolle",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Als WHK habe ich das Vorfeld in Cameo Systems Modeler mit SysML modelliert, Diagramme für unterschiedliche Sichten erstellt und durch Interviews mit den Akteuren des Vorfelds fehlende Informationen erhoben. Das Modell war das gemeinsame Referenzartefakt im Projekt.",
            },
          ],
        ],
      },
      {
        title: "Modellierung & Methoden",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Eingesetzte Diagrammtypen unter anderem: Requirements (req), Block Definition (bdd), Internal Block (ibd), Activity (act) und State Machine (stm). Damit ließen sich Struktur, Verhalten und Anforderungen des Vorfelds konsistent abbilden und für das Team nachvollziehbar machen.",
            },
          ],
        ],
      },
      {
        title: "Logische Architektur (BDD)",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Im Block Definition Diagram (bdd) habe ich das System of Interest (SOI) als logische Architektur mit vier Subsystemen modelliert. Diese Struktur bildete die gemeinsame Sicht auf das Gesamtsystem und entsprach später den Arbeitspaketen (AP) im Projekt.",
            },
          ],
        ],
        listItems: [
          "Apron Data Collector System → AP2: Sensorerfassung auf dem Vorfeld",
          "Central Data Space System → AP3: Controller des SOI für Datenverteilung und -speicherung",
          "Bridge Operation System → AP4: automatische Steuerung der Fluggastbrücke",
          "HMI System → AP5: Benutzerschnittstellen, über die Akteure das System nutzen (u. a. Smartwatch-App)",
        ],
        media: {
          type: "image",
          src: "/media/fastgate-bdd-subsystems.png",
          alt: "SysML bdd: SOI mit vier Subsystemen – Apron Data Collector, HMI, Central Data Space und Bridge Operation System",
          caption:
            "bdd – System Structure: logische Architektur des SOI mit vier Subsystemen (Cameo Systems Modeler / SysML).",
        },
      },
      {
        title: "Interne Schnittstellen (ibd)",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Das Internal Block Diagram (ibd) zeigt, wie die vier Subsysteme innerhalb des SOI miteinander kommunizieren – inklusive der Datenflüsse zwischen den Blöcken und dem Austausch mit der Umgebung (Environment).",
            },
          ],
          [
            {
              type: "text",
              value:
                "Als Environment-Objekte sind unter anderem das Vorfeld (Apron) und die Fluggastbrücke modelliert. Das Apron Data Collector System und das Bridge Operation System überwachen diese Bereiche und erheben Messdaten. Beide leiten ihre Daten an das Central Data Space System (CDS) weiter, das darauf basierend Analysen durchführt und verschiedene Services bereitstellt. Ein Großteil der Ergebnisse geht ans HMI System und wird dort den Nutzern bereitgestellt.",
            },
          ],
        ],
        listItems: [
          "Environment → Apron Data Collector: apronMeasurement; Weiterleitung als apronSensorDataToCDS ans CDS",
          "Environment ↔ Bridge Operation System: bridgeMeasurement, controlPanelInput, bridge_data; Steuerung u. a. über bridgeMovementCommandToBMS vom CDS",
          "CDS ↔ HMI System: Abfragen und Updates zu Activity States und Brückenposition (Request/Response)",
          "Bridge Operation System → HMI: sensorDataToIPad für die Anzeige an Akteure",
        ],
        media: {
          type: "image",
          src: "/media/fastgate-ibd-soi.png",
          alt: "SysML ibd des SOI: Datenflüsse zwischen Apron Data Collector, Bridge Operation, Central Data Space und HMI System sowie zur Environment",
          caption:
            "ibd – SOI: Kommunikation der Subsysteme und Datenflüsse zur Environment (Cameo Systems Modeler / SysML).",
        },
      },
      {
        title: "State Machines, Smartwatch-App & Simulation",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Ein Schwerpunkt meiner Arbeit waren State Machines (stm) für die Abläufe am Vorfeld. Die Modelle flossen in eine Smartwatch-App ein, über die beteiligte Akteure – etwa Ramp Agent, Loader und Terminal Agent – miteinander kommunizieren und sich gegenseitig Freigaben oder Requests geben konnten.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Genau diese Koordinationsabläufe habe ich mit State Machines modelliert, automatisiert und simuliert, um Verhalten früh zu prüfen und das Team auf einer gemeinsamen Sicht zu halten.",
            },
          ],
        ],
        media: {
          type: "video",
          src: "/media/fastgate-statemachines.mp4",
          mimeType: "video/mp4",
          title: "FastGate: modellierte State Machines",
          caption:
            "Aufzeichnung der erstellten State Machines, die als Grundlage für die Smartwatch-App und die Simulation der Vorfeld-Abläufe dienten.",
        },
      },
      {
        title: "Ergebnis",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Das Systemmodell hat als Kommunikationswerkzeug zwischen den Arbeitspaketen und deren Beteiligten funktioniert – weniger Missverständnisse über Schnittstellen, klarere gemeinsame Begriffe und eine belastbare Grundlage für die weitere Projektarbeit. Die modellierten und simulierten Abläufe machten die Interaktion der Akteure am Vorfeld explizit und überprüfbar.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Einzelne Ports, Flows und weitere Details sind im ibd direkt nachvollziehbar. Für Rückfragen zu den Modellen kannst du mir auch gern eine ",
            },
            {
              type: "link",
              label: "E-Mail",
              url: `mailto:${profile.email}`,
            },
            {
              type: "text",
              value: " schreiben.",
            },
          ],
        ],
      },
    ],
  },
];

export function getTimelineDetailBySlug(
  slug: string | undefined,
): TimelineDetail | undefined {
  if (!slug) return undefined;
  return timelineDetails.find((detail) => detail.slug === slug);
}
