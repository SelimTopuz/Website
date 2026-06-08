import type { DetailSectionMedia } from "../components/DetailMedia";
import { profile } from "./profile";
import type { TextSegment } from "./profile";

export interface TimelineDetailSection {
  title: string;
  paragraphs: TextSegment[][];
  listItems?: string[];
  media?: DetailSectionMedia;
  mediaItems?: DetailSectionMedia[];
  paragraphsAfterMedia?: TextSegment[][];
  mediaAfterParagraphs?: DetailSectionMedia[];
  /** Paragraphs after {@link mediaAfterParagraphs}. */
  paragraphsAfterMediaItems?: TextSegment[][];
  /** Media after {@link paragraphsAfterMediaItems} (e.g. a follow-up demo). */
  mediaAfterMediaItems?: DetailSectionMedia[];
}

const FASTGATE_PROJECT_URL =
  "https://innovationsflughafen.de/projekte/fastgate/";

const GENAI4PC_PROJECT_URL = "https://www.uni-paderborn.de/projekt/1630";

const GENAI4PC_REPO_URL = "https://github.com/SelimTopuz/GenAI4PC";

export interface TimelineDetailTab {
  id: string;
  label: string;
  sections: TimelineDetailSection[];
}

export interface TimelineDetail {
  slug: string;
  title: string;
  period?: string;
  contextLabel: string;
  backAnchorId: string;
  projectUrl?: string;
  projectLinkLabel?: string;
  modelsPagePath?: string;
  intro: TextSegment[][];
  sections?: TimelineDetailSection[];
  tabs?: TimelineDetailTab[];
}

export const timelineDetails: TimelineDetail[] = [
  {
    slug: "fastgate",
    title: "FastGate",
    period: "01.12.2024 – 31.09.2025",
    contextLabel: "Advanced Systems Engineering · Wissenschaftliche Hilfskraft",
    backAnchorId: "timeline-module-wissenschaftliche-hilfskraft-ase-fastgate",
    modelsPagePath: "/projekte/fastgate/models",
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
          value: " habe ich als Systems Engineer in der Fachgruppe ",
        },
        {
          type: "link",
          label: "Advanced Systems Engineering",
          url: "https://www.hni.uni-paderborn.de/ase/",
        },
        {
          type: "text",
          value:
            " am Heinz Nixdorf Institut an der Konzeption des Zielsystems mitgewirkt.",
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
                "FastGate ist ein Forschungsprojekt am Flughafen Paderborn/Lippstadt, das sich mit der Optimierung von Prozessen auf dem Flughafenvorfeld beschäftigte. Ziel des Projekts war es, zentrale Abläufe auf dem Vorfeld effizienter, sicherer und transparenter zu gestalten.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Zu Beginn wurden fünf relevante Aktivitätsfelder identifiziert: Flugzeugan- und -abfahrt, Turnaround Operations, Fluggastabfertigung, Housekeeping sowie Gepäckabfertigung. Diese Bereiche wurden anschließend systematisch bewertet und priorisiert. Für die weitere Bearbeitung im Projekt FastGate wurden schließlich die Aktivitätsfelder Flugzeugan- und -abfahrt sowie Turnaround Operations als zentrale Schwerpunkte ausgewählt.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Insgesamt arbeiteten sechs Partner aus Wissenschaft und Praxis gemeinsam daran, innovative Lösungen für die Herausforderungen auf dem Flughafenvorfeld zu entwickeln. Ein konkretes Ziel bestand in der Automatisierung der Fluggastbrücke. Diese sollte künftig selbstständig an ein einfahrendes Flugzeug ankoppeln und sich nach Abschluss des Boarding- oder Deboarding-Prozesses automatisch wieder entkoppeln. Dadurch sollten die Prozesse der Flugzeugan- und -abfahrt beschleunigt und effizienter gestaltet werden.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Ein weiteres Ziel war die Digitalisierung der Kommunikation während der Turnaround Operations. Durch eine digitale Unterstützung der Mitarbeitenden sollten Abstimmungen vereinfacht, Informationen schneller bereitgestellt und Verzögerungen im Ablauf reduziert werden. Auf diese Weise sollte FastGate dazu beitragen, die Koordination auf dem Flughafenvorfeld insgesamt zu verbessern und die relevanten Prozesse effizienter zu gestalten.",
            },
          ],
        ],
      },
      {
        title: "Mein Aufgabenbereich",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Zur Entwicklung eines solchen komplexen Systems wurde im Projekt der Ansatz des Model-Based Systems Engineering eingesetzt. In diesem Zusammenhang habe ich damit begonnen, ein Systemmodell in Cameo Systems Modeler aufzubauen. Dieses Modell sollte als zentraler Wissensspeicher sowie als gemeinsame Kommunikationsgrundlage für die Projektpartner dienen.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Ein erster wesentlicher Schritt bestand darin, das Zielsystem in sinnvolle Subsysteme zu zerlegen und die Kommunikation zwischen diesen Subsystemen zu definieren. Dadurch konnte das Gesamtsystem strukturiert beschrieben und die weitere Entwicklung auf die beteiligten Projektpartner aufgeteilt werden. Gleichzeitig wurde ermöglicht, dass die einzelnen Subsysteme parallel weiterentwickelt werden konnten.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Die Struktur des Systems wurde mithilfe von Block Definition Diagrams beschrieben, während die Schnittstellen und Interaktionen zwischen den Subsystemen über Internal Block Diagrams modelliert wurden.",
            },
          ],
        ],
        mediaItems: [
          {
            type: "image",
            src: "/media/fastgate-bdd-subsystems.jpg",
            alt: "SysML bdd: SOI mit vier Subsystemen – Apron Data Collector, HMI, Central Data Space und Bridge Operation System",
            caption:
              "bdd – System Structure: logische Architektur des SOI mit vier Subsystemen (Cameo Systems Modeler / SysML).",
          },
          {
            type: "image",
            src: "/media/fastgate-ibd-soi.png",
            alt: "SysML ibd des SOI: Datenflüsse zwischen Apron Data Collector, Bridge Operation, Central Data Space und HMI System sowie zur Environment",
            caption:
              "ibd – SOI: Kommunikation der Subsysteme und Datenflüsse zur Environment (Cameo Systems Modeler / SysML).",
            lightboxSize: "large",
          },
        ],
        paragraphsAfterMedia: [
          [
            {
              type: "text",
              value:
                "Die Aufteilung des Zielsystems in Subsysteme bildete zugleich die Grundlage für die Strukturierung des Projekts in mehrere Arbeitspakete. Daraus ergaben sich unter anderem die folgenden zentralen Arbeitspakete: AP2 Apron Data Collector System, AP3 Central Data Space System, AP4 Bridge Operation System sowie AP5 HMI System.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Das Apron Data Collector System ist für die Erfassung relevanter Objekt- und Umgebungsdaten auf dem Flughafenvorfeld zuständig. Hierfür werden verschiedene Sensoren eingesetzt, um die aktuelle Situation auf dem Vorfeld möglichst umfassend abzubilden.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Das Central Data Space System übernimmt die Aggregation, Verarbeitung und Analyse der erfassten Daten. Auf dieser Grundlage stellt es verschiedene Microservices bereit, die von den weiteren Subsystemen genutzt werden können.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Das Bridge Operation System ist für die Steuerung der Fluggastbrücke verantwortlich. Es bildet damit die technische Grundlage für das automatisierte An- und Abdocken der Fluggastbrücke an das Flugzeug.",
            },
          ],
          [
            {
              type: "text",
              value:
                "Das HMI System stellt die Benutzerschnittstellen des Gesamtsystems bereit. Über diese Schnittstellen können Nutzer mit dem System interagieren und beispielsweise Funktionen zur Steuerung oder Überwachung der Fluggastbrücke ausführen.",
            },
          ],
        ],
        mediaAfterParagraphs: [
          {
            type: "arbeitspakete-diagram",
            modelsPagePath: "/projekte/fastgate/models",
            caption:
              "Zusammenhänge der Arbeitspakete AP1–AP6 im FastGate-Projekt.",
          },
        ],
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
  {
    slug: "genai4pc",
    title: "GenAI4PC",
    period: "01.10.2025 – 01.05.2026",
    contextLabel: "Advanced Systems Engineering · Wissenschaftliche Hilfskraft",
    backAnchorId: "timeline-module-wissenschaftliche-hilfskraft-ase-genai4pc",
    intro: [
      [
        {
          type: "text",
          value: "Im Forschungsprojekt ",
        },
        {
          type: "link",
          label: "GenAI4PC",
          url: GENAI4PC_PROJECT_URL,
          plain: true,
        },
        {
          type: "text",
          value:
            " (Generative Artificial Intelligence im Engineering für Allgemeinheit und Kreativität) habe ich in der ",
        },
        {
          type: "link",
          label: "Fachgruppe Advanced Systems Engineering",
          url: "https://www.hni.uni-paderborn.de/ase/",
        },
        {
          type: "text",
          value:
            " am Heinz Nixdorf Institut an der Entwicklung eines KI-gestützten Lernassistenten für Studierende mitgewirkt.",
        },
      ],
    ],
    tabs: [
      {
        id: "anwendung",
        label: "Anwendung & Projektdetails",
        sections: [
          {
            title: "Ziel des Projekts",
            paragraphs: [
              [
                {
                  type: "text",
                  value:
                    "GenAI4PC untersucht, wie generative Künstliche Intelligenz gezielt eingesetzt werden kann, um Studierenden beim Verständnis von Vorlesungsinhalten zu helfen – nicht nur Antworten bereitzustellen, sondern nachhaltiges Lernen zu fördern.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Konkret war das Ziel, ein AI-Agent zu entwickeln, der aus bereitgestelltem Vorlesungsmaterial zentrale Konzepte extrahiert, daraus passende Übungsaufgaben generiert und Lernende beim selbstständigen Lösen begleitet. Der Agent soll Aufgaben erklären, eingereichte Antworten bewerten und Fragen zu den Inhalten der Vorlesung beantworten.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Damit sollte erforscht werden, unter welchen Bedingungen GenAI beim Lernenden tatsächlich Verständnis aufbaut – und wo Grenzen oder Risiken (z. B. Oberflächlichkeit, Halluzinationen) liegen.",
                },
              ],
            ],
          },
          {
            title: "Funktionsweise des Assistenten",
            paragraphs: [
              [
                {
                  type: "text",
                  value:
                    "Die Anwendung basiert auf sogenannten Learning Spaces bzw. Workspaces. Diese können für bestimmte Themen, Fächer oder Lehrveranstaltungen erstellt werden und dienen als zentrale Umgebung, in der relevante Wissensquellen wie Skripte, Präsentationen oder weitere Lehrmaterialien bereitgestellt werden.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Das System unterscheidet drei Rollen: Lehrer, Schüler und Admin. Lehrer können Workspaces erstellen und löschen, Lehrmaterialien hochladen, Schüler anlegen und diese bestimmten Workspaces zuweisen. Schüler haben ausschließlich Zugriff auf die Workspaces, denen sie hinzugefügt wurden. Dort können sie mit den bereitgestellten Inhalten interagieren, Fragen stellen und Aufgaben bearbeiten. Admins verfügen über erweiterte Verwaltungsrechte. Sie können unter anderem Lehrer und weitere Admins erstellen sowie sämtliche zentralen Funktionen des Systems nutzen.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Der Ablauf beginnt damit, dass ein Lehrer einen neuen Learning Space erstellt und anschließend die zugehörigen Lehrmaterialien hochlädt. Diese Materialien werden mithilfe von LlamaParse verarbeitet. Dabei werden nicht nur textuelle Inhalte extrahiert, sondern auch Bilder und Tabellen analysiert und durch textuelle Interpretationen ergänzt. Anschließend werden die Dokumente in kleinere Abschnitte, sogenannte Chunks, unterteilt und in einer Datenbank gespeichert.",
                },
              ],
            ],
            media: {
              type: "video",
              src: "/media/genai4pc/part-1-upload-chunking.mp4",
              mimeType: "video/mp4",
              title: "GenAI4PC: Upload und Chunking (Demo)",
              caption:
                "Demo: Hochladen von Lehrmaterialien, Verarbeitung mit LlamaParse und Erzeugung der Chunks im Learning Space.",
            },
            paragraphsAfterMedia: [
              [
                {
                  type: "text",
                  value:
                    "Auf Grundlage dieser Chunks werden zentrale Konzepte des Lehrmaterials automatisch generiert. Diese Konzepte können vom Lehrer überprüft und bei Bedarf angepasst werden. Anschließend werden aus den Konzepten passende Aufgaben erzeugt, die ebenfalls nachträglich bearbeitet oder ergänzt werden können. Sobald dieser Prozess abgeschlossen ist, ist der Learning Space vorbereitet und kann von den Schülern genutzt werden.",
                },
              ],
            ],
            mediaAfterParagraphs: [
              {
                type: "video",
                src: "/media/genai4pc/part-2-concepts-tasks.mp4",
                mimeType: "video/mp4",
                title: "GenAI4PC: Konzepte und Aufgaben (Demo)",
                caption:
                  "Demo: Automatische Generierung von Konzepten und Aufgaben sowie Anpassung durch den Lehrer.",
              },
            ],
            paragraphsAfterMediaItems: [
              [
                {
                  type: "text",
                  value:
                    "Die Schüler können innerhalb des Learning Spaces Fragen zu den hochgeladenen Materialien stellen oder die generierten Aufgaben bearbeiten. Die abgegebenen Antworten werden automatisch evaluiert und mit einem Feedback versehen. Falls eine Antwort noch nicht ausreichend ist, erhält der Schüler gezielte Denkanstöße und kann seine Antwort überarbeiten. Nach erfolgreicher Bearbeitung kann er zur nächsten Aufgabe übergehen.",
                },
              ],
            ],
            mediaAfterMediaItems: [
              {
                type: "video",
                src: "/media/genai4pc/part-3-questions-tasks.mp4",
                mimeType: "video/mp4",
                title: "GenAI4PC: Fragen und Aufgaben (Demo)",
                caption:
                  "Demo: Fragen zu Lehrmaterialien stellen, Aufgaben bearbeiten sowie automatische Evaluation und Feedback.",
              },
            ],
          },
          {
            title: "Ergebnis",
            paragraphs: [
              [
                {
                  type: "text",
                  value:
                    "Es entstand ein funktionsfähiger Prototyp, der aus Vorlesungsunterlagen Konzepte und Übungsaufgaben ableitet, Antworten einordnet und Rückfragen zum Stoff beantwortet. Damit ließ sich der Lernpfad von der Materialanalyse bis zur geführten Übung durchgängig darstellen.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "In der Praxis zeigte sich, dass die Konzeptgenerierung aus den Vorlesungsmaterialien zuverlässig und inhaltlich überzeugend funktionierte. Die Aufgabengenerierung sowie die automatische Evaluation von Schülerantworten erwiesen sich dagegen in puncto Genauigkeit als noch problematisch – hier blieb häufig eine manuelle Überprüfung durch Lehrende notwendig.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Bei Rückfragen zum Projekt erreichst du mich gern per ",
                },
                {
                  type: "link",
                  label: "E-Mail",
                  url: `mailto:${profile.email}`,
                },
                {
                  type: "text",
                  value: ".",
                },
              ],
            ],
          },
        ],
      },
      {
        id: "implementierung",
        label: "Implementierung",
        sections: [
          {
            title: "Mein Aufgabenbereich",
            paragraphs: [
              [
                {
                  type: "text",
                  value:
                    "Mein Schwerpunkt lag auf der Konzeption und Implementierung des Prototyps: Pipeline zur Aufbereitung von Vorlesungsmaterial, Extraktion relevanter Konzepte sowie Generierung und Strukturierung von Übungsaufgaben mit passenden Erklär- und Feedback-Funktionen.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Dazu gehörten die Auswahl und Anbindung geeigneter LLM-Dienste, Prompt-Design für verständliche Aufgabenstellungen und konstruktives Feedback sowie erste Evaluierungen mit Beispielmaterial aus der Lehre.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Parallel habe ich Anforderungen und Nutzungsszenarien mit dem Projektteam abgestimmt, damit der Agent den Lernprozess unterstützt, ohne Lösungen vorwegzunehmen.",
                },
              ],
            ],
          },
          {
            title: "Pipeline-Architektur",
            paragraphs: [
              [
                {
                  type: "text",
                  value: "Quellcode des Prototyps im ",
                },
                {
                  type: "link",
                  label: "GitHub-Repository GenAI4PC",
                  url: GENAI4PC_REPO_URL,
                },
                {
                  type: "text",
                  value: ".",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Das FastAPI-Backend lässt sich vereinfacht in sechs zentrale Module unterteilen: Dokumenten-Ingestion, Konzept- und Aufgabengenerierung, Chat-Sessions, Retrieval und Prompting, LLM-Gateway sowie Antwortbewertung. Diese Module bilden gemeinsam die technische Grundlage der KI-gestützten Lernplattform.",
                },
              ],
              [
                {
                  type: "text",
                  value:
                    "Die dargestellte Pipeline visualisiert die fünf relevanten Prozessphasen der Anwendung. Je nach ausgewähltem Reiter passt sich das Diagramm an und zeigt den jeweiligen Teilprozess sowie die dazugehörige Beschreibung. Dadurch wird nachvollziehbar, welche Komponenten in der jeweiligen Phase beteiligt sind und wie die einzelnen Schritte innerhalb des Systems zusammenwirken.",
                },
              ],
            ],
            media: {
              type: "genai4pc-flow-diagram",
              caption:
                "Komponentenarchitektur mit sechs FastAPI-Modulen; Phasen-Tabs markieren den jeweiligen Datenfluss auf derselben Leinwand.",
            },
          },
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
