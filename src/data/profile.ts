import {
  timelineEntryAnchorUrl,
  timelineModuleAnchorUrl,
} from "../utils/timelineAnchors";

export type TextSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; url: string };

export interface TimelineLogo {
  alt: string;
  imageUrl?: string;
  initials?: string;
}

export interface TimelineModuleHighlight {
  title: string;
  period?: string;
  badge?: "MVP" | "Honorable Mention" | "Lehrpreis" | "In Arbeit";
  grade?: string;
  description?: string;
  descriptionSegments?: TextSegment[];
  /** Route slug under /projekte/:slug for a detail page with more content. */
  detailSlug?: string;
}

export interface TimelineListGroup {
  title: string;
  items: string[];
  modules?: TimelineModuleHighlight[];
  emphasis?: boolean;
}

export interface TimelineSideEntry {
  title: string;
  period?: string;
  logo: TimelineLogo;
  paragraphs: TextSegment[][];
  closingParagraphs?: TextSegment[][];
  numberedList?: string[];
  groupedLists?: TimelineListGroup[];
}

export interface TimelineRow {
  period: string;
  left?: TimelineSideEntry;
  right?: TimelineSideEntry;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "email" | "x" | "website";
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  highlight?: boolean;
}

export interface EngineeringHighlight {
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  tagline: string;
  avatarUrl?: string;
  email: string;
  location: string;
  siteUrl: string;
  cvUrl?: string;
  socialLinks: SocialLink[];
  timelineRows: TimelineRow[];
  about: string[];
  skills: Skill[];
  projects: Project[];
  engineering: EngineeringHighlight[];
}

export const profile: Profile = {
  name: "Selim Topuz",
  tagline: "Bereit durchzustarten und meinen Platz zu finden. 🚀🌱🌟",
  avatarUrl: "/profile.jpg",
  email: "selim.topuz@example.com",
  location: "Deutschland",
  siteUrl: "https://selim-topuz.dev",
  socialLinks: [
    { label: "GitHub", url: "https://github.com", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { label: "E-Mail", url: "mailto:selim.topuz@example.com", icon: "email" },
  ],
  timelineRows: [
    {
      period: "2023 –",
      left: {
        title: "Wirtschaftsinformatik Master - UPB",
        period: "2023 – Okt. 2026",
        logo: {
          alt: "Universität Paderborn",
          imageUrl: "/logos/uni-paderborn.png",
        },
        paragraphs: [
          [
            {
              type: "text",
              value: "Master of Science (M.Sc.) in ",
            },
            {
              type: "link",
              label: "Wirtschaftsinformatik an der Universität Paderborn",
              url: "https://www.uni-paderborn.de/studienangebot/studiengang/wirtschaftsinformatik-master",
            },
            {
              type: "text",
              value:
                ". Schwerpunkte: AI Agents & Systems Engineering. Aktuell in der Masterarbeit.",
            },
          ],
        ],
        groupedLists: [
          {
            title: "Masterarbeit",
            emphasis: true,
            items: [],
            modules: [
              {
                title:
                  "LLM-basiertes Entscheidungsunterstützungssystem für Nachhaltigkeitsmethoden",
                badge: "In Arbeit",
                descriptionSegments: [
                  {
                    type: "text",
                    value:
                      "Konzeption eines DSS, das Produktentwicklern hilft, für ihren Kontext die passenden Nachhaltigkeitsmethoden zu finden. Untersuchung, welche Use Cases LLMs dabei sinnvoll unterstützen können. Zeitraum: 15.04. – 15.10.2026. Betreuung: ",
                  },
                  {
                    type: "link",
                    label: "Prof. Roman Dumitrescu",
                    url: "https://www.uni-paderborn.de/person/16190",
                  },
                  {
                    type: "text",
                    value: " (",
                  },
                  {
                    type: "link",
                    label: "Fachgruppe Advanced Systems Engineering",
                    url: "https://www.hni.uni-paderborn.de/ase/",
                  },
                  {
                    type: "text",
                    value: ", Heinz Nixdorf Institut).",
                  },
                ],
              },
            ],
          },
          {
            title: "Systems Engineering Schwerpunkt",
            emphasis: true,
            items: [],
            modules: [
              {
                title: "Model-based Systems Engineering",
                grade: "1,7",
                descriptionSegments: [
                  {
                    type: "text",
                    value:
                      "Erstes Mastermodul im Bereich Systems Engineering gewesen. Hat sich mit Systems Thinking, Modellierungstools sowie Modellierungsmethoden wie CONSENS und SysML befasst und das Ganze praktisch in draw.io an einem Smart-Home-Security-System umgesetzt. Die 1,7 in dem Modul hat mir am Ende sogar ein ",
                  },
                  {
                    type: "link",
                    label: "Jobangebot",
                    url: timelineEntryAnchorUrl(
                      "Wissenschaftliche Hilfskraft - ASE",
                    ),
                  },
                  {
                    type: "text",
                    value:
                      " in der Advanced Systems Engineering Gruppe am Heinz Nixdorf Institut eingebracht. Dort bin ich eingestiegen, weil ich gemerkt habe, dass mir dieses strukturierte Modellieren wirklich liegt und Spaß macht.",
                  },
                ],
              },
              {
                title: "Systems Engineering",
                grade: "3,0",
                description:
                  "In diesem Modul wurden die Grundlagen aus dem ersten Systems-Engineering-Kontext vertieft. Im Fokus standen intelligente technische Systeme, deren steigende Komplexität und die Frage, warum klassische Entwicklungsansätze dafür oft nicht mehr ausreichen. Außerdem ging es um den Produktlebenszyklus, technische und Managementprozesse sowie darum, wie Systems Engineering je nach Kontext angepasst und praktisch angewendet werden kann. MBSE wurde dabei grob angeschnitten.",
              },
              {
                title: "Data-driven Engineering",
                grade: "1,3",
                description:
                  "In dem Modul wurde entlang des V-Modells gezeigt, wie ein Produkt systematisch entwickelt wird. Von den Anforderungen bis zur Absicherung durch Tests. Der Fokus dabei lag auf der generative KI: Es wurde gezeigt, wie KI einzelne Aktivitäten im V-Modell unterstützen kann, zum Beispiel durch AI-Agenten fürs Requirements Engineering, bei der Generierung von Test Cases...",
              },
            ],
          },
          {
            title: "AI Agents Schwerpunkt",
            emphasis: true,
            items: [],
            modules: [
              {
                title: "Projektseminar Generative KI und Digitale Märkte",
                grade: "1,7",
                description:
                  "GenAI genutzt, um ein Dashboard zu entwickeln. Grundlagen und Funktionsweise von GenAI, OpenAI Batch API sowie verschiedene Techniken des Prompt Engineering.",
              },
              {
                title: "Projektseminar Conversational Agents",
                badge: "Lehrpreis",
                grade: "1,2",
                description:
                  "Preisgekröntes Seminar: Chatbot für Studierende zum Verstehen soziologischer Theorien. RAG mit React-Frontend und FastAPI-Python-Backend, OpenAI als LLM. Besonderer Fokus auf Transparenz und Richtigkeit – bei jeder Antwort die exakten Stellen in den Quelldokumenten.",
              },
              {
                title: "Data-driven Engineering",
                grade: "1,3",
                description:
                  "AI Agent implementiert, der aus einem Prompt verschiedene CAD-Modelle im .stl-Format generieren kann. Backend: Python mit Flask, Frontend: React, LLM: OpenAI.",
              },
            ],
          },
        ],
      },
      right: {
        title: "Wissenschaftliche Hilfskraft - ASE",
        period: "2024 – jetzt",
        logo: {
          alt: "Heinz Nixdorf Institut",
          imageUrl: "/logos/hni.png",
        },
        paragraphs: [
          [
            {
              type: "text",
              value: "Wissenschaftliche Hilfskraft bei der ",
            },
            {
              type: "link",
              label: "Fachgruppe Advanced Systems Engineering",
              url: "https://www.hni.uni-paderborn.de/ase/",
            },
            {
              type: "text",
              value: " am ",
            },
            {
              type: "link",
              label: "Heinz Nixdorf Institut",
              url: "https://www.hni.uni-paderborn.de/",
            },
            {
              type: "text",
              value: ". Das Jobangebot habe ich durch eine gute Note im Modul ",
            },
            {
              type: "link",
              label: "Model-based Systems Engineering",
              url: timelineModuleAnchorUrl(
                "Wirtschaftsinformatik Master - UPB",
                "Model-based Systems Engineering",
                "Systems Engineering Schwerpunkt",
              ),
            },
            {
              type: "text",
              value: " erhalten.",
            },
          ],
          [
            {
              type: "text",
              value:
                "In meiner Zeit bei der ASE war ich in folgende Forschungsprojekte integriert:",
            },
          ],
        ],
        groupedLists: [
          {
            title: "",
            items: [],
            modules: [
              {
                title: "Requirements AI Agent – Frontend-Studie",
                period: "ab 01.06.2026",
                badge: "In Arbeit",
                description:
                  "Vergleich zweier Frontend-Designs für einen Requirements AI Agenten: (1) klassischer Chatbot mit Texteingabe, Chatverlauf und freier Prompt-Eingabe für Anforderungen – (2) UI mit definierten Aktionen ohne freie Texteingabe. Identisches Backend. Fokus: Messung der Frontend-Nutzung – welche Buttons geklickt werden, wie lange welche Schritte dauern und vergleichbares Nutzungsverhalten.",
              },
              {
                title: "GenAI4PC",
                period: "01.10.2025 – 01.05.2026",
                description:
                  "Entwicklung eines AI-Agenten, der Studierenden beim Erlernen von Vorlesungsinhalten hilft. Fokus: Wie GenAI beim Lernenden tatsächlich Verständnis schafft. Prototyp extrahiert zentrale Konzepte aus Vorlesungsmaterial und generiert daraus Übungsaufgaben zum selbstständigen Lösen. Der Agent erklärt Aufgaben, evaluiert Antworten und beantwortet Fragen zu den Vorlesungsinhalten.",
              },
              {
                title: "FastGate",
                period: "01.12.2024 – 31.09.2025",
                detailSlug: "fastgate",
                description:
                  "Modellierung des Vorfelds des Flughafens Paderborn/Lippstadt mit Cameo Systems Modeler und SysML. Das Systemmodell diente als Kommunikationswerkzeug zwischen den Arbeitspaketen des Projekts und deren Beteiligten.",
              },
            ],
          },
        ],
        closingParagraphs: [
          [
            {
              type: "text",
              value:
                "Ergänzend unterstütze ich die wissenschaftlichen Mitarbeitenden u. a. bei Literaturrecherchen, PowerPoint-Präsentationen und beim Zusammenstellen von Inhalten für Paper.",
            },
          ],
        ],
      },
    },
    {
      period: "2022 – 2024",
      right: {
        title: "Werkstudent Softwareentwickler - Eviden",
        logo: {
          alt: "Eviden",
          imageUrl: "/logos/eviden.png",
        },
        paragraphs: [
          [
            {
              type: "text",
              value: "Werkstudent als Softwareentwickler bei ",
            },
            {
              type: "link",
              label: "Eviden",
              url: "https://eviden.com/",
            },
            {
              type: "text",
              value:
                " (ehemals Atos). Hier habe ich praktische Erfahrung in Backend- und Frontend-Implementierung gesammelt.",
            },
          ],
        ],
        groupedLists: [
          {
            title: "Projekte",
            items: [],
            modules: [
              {
                title: "KIAM",
                description:
                  "KI- gestütztes Assistenzsystem für Mitarbeitende von Weidmüller, welches Mitarbeitende bei Maschinenfehlern unterstützt. Ziel war es, relevante Informationen zur Fehlerbehebung verständlich bereitzustellen und die Bedienung der Maschinen im Störfall zu erleichtern. Das Backend wurde mit Java und Spring Boot umgesetzt, das Frontend mit Vue.js. Zentrale Themen waren Layout Extraction und NLP - das war noch vor dem LLM Hype also noch komplexer zu lösen 😂😂",
              },
              {
                title: "BIKINI (Bionik und KI zur Nachhaltigen Integration)",
                description:
                  "Entwicklung einer Toolbox aus bionischen Konstruktionsalgorithmen, KI-basierten Assistenzdiensten und Nachhaltigkeitsbewertungen – für ressourceneffiziente Leichtbauprodukte über den gesamten Lebenszyklus. Schwerpunkt Advanced Requirements Engineering: Anforderungen früh systematisch erfassen und präzisieren, um unnötigen Ressourceneinsatz in Prototyping, Produktentwicklung und späterer Nutzung zu vermeiden. Frontend: Angular, Backend: Java Spring Boot.",
              },
            ],
          },
        ],
      },
    },
    {
      period: "2018 – 2023",
      left: {
        title: "Wirtschaftsinformatik Bachelor - UPB",
        logo: {
          alt: "Universität Paderborn",
          imageUrl: "/logos/uni-paderborn.png",
        },
        paragraphs: [
          [
            {
              type: "text",
              value: "Bachelor of Science (B.Sc.) in ",
            },
            {
              type: "link",
              label: "Wirtschaftsinformatik an der Universität Paderborn",
              url: "https://www.uni-paderborn.de/studienangebot/studiengang/wirtschaftsinformatik-bachelor",
            },
            {
              type: "text",
              value:
                " (Note 1,8). Schwerpunkte in Data Science & Decision Making, Social Media, digitalen Märkten und Informatik.",
            },
          ],
        ],
        groupedLists: [
          {
            title: "Data Science & Decision Making",
            emphasis: true,
            items: [],
            modules: [
              {
                title: "Grundlagen von Managementinformationsystemen",
                grade: "1,3",
                description:
                  "Einführung in grundlegende Konzepte und Methoden von MIS – Entwicklung und Einsatz illustriert durch Fallstudien und Übungen. Behandelt wurden u. a. Data Warehouses, Reporting, Dashboards, Data Mining und Big Data. Hier habe ich erstmals Decision Trees, K-Means-Clustering und weitere grundlegende Data-Science-Algorithmen kennengelernt. Die Idee, aus Daten Prognosen zu gewinnen und Entscheidungen zu verbessern, hat mein Interesse an Data Science geweckt.",
              },
              {
                title: "Methoden der Data Science",
                grade: "2,0",
                description:
                  "Implementierung verschiedener Methoden in R: Regression, Random Forest, Clustering, Sentiment Analysis, Topic Modeling. Genutzt wurden R, Posit (ehemals RStudio) und das R-Paket Shiny. Ergänzend angeschnitten: Data Visualization mit Tableau sowie Transforming and Cleaning Data (Outlier Handling, Duplicate Detection, Missing Values).",
              },
              {
                title: "Data Visualization",
                grade: "1,7",
                description:
                  "Vertiefungsmodul: Mehrere Dashboards mit R, Posit und Shiny. Theorie zu Visualisierung numerischer und kategorischer Daten, Time Series, Data Maps sowie interaktiven Visualisierungen (Server- und Client-seitig).",
              },
              {
                title: "Studienarbeit Predictive Analytics",
                grade: "2,0",
                descriptionSegments: [
                  {
                    type: "text",
                    value:
                      "Vermittlung von Machine Learning (supervised & unsupervised) und wissenschaftlichem Arbeiten. Aufgabe: Teilnahme an einer ",
                  },
                  {
                    type: "link",
                    label: "Kaggle Competition (ASHRAE Energy Prediction)",
                    url: "https://www.kaggle.com/c/ashrae-energy-prediction",
                  },
                  {
                    type: "text",
                    value:
                      " – dort einen Random-Forest-Algorithmus angewendet und darüber die Studienarbeit geschrieben.",
                  },
                ],
              },
            ],
          },
          {
            title: "Social Media",
            items: [],
          },
          {
            title: "Digitale Märkte",
            items: [],
          },
          {
            title: "Informatik",
            emphasis: true,
            items: [],
            modules: [
              {
                title: "Programmierung",
                grade: "1,0",
                description:
                  "Mein erstes Informatikmodul – hier habe ich Python kennengelernt und den Einstieg in die Programmierung gemacht.",
              },
              {
                title: "Programmiersprachen",
                grade: "1,0",
                description:
                  "Fokus auf unterschiedliche Programmierparadigmen, insbesondere funktionale Programmierung und Logikprogrammierung. Einzelne Sprachen wurden bewusst nur angeschnitten. Mit 1,0 abgeschlossen – und dadurch später ein Jobangebot als Tutor erhalten.",
              },
              {
                title: "Datenbanksysteme",
                grade: "1,0",
                description:
                  "Relationale Datenmodelle und -algebra, SQL sowie Datenbankschemaentwurf standen im Mittelpunkt. NoSQL-Datenbanken wurden ergänzend behandelt.",
              },
              {
                title: "Software Engineering",
                badge: "MVP",
                grade: "1,0",
                description:
                  "Das Modul, das mein Interesse an Softwareentwurf geweckt hat. Modellbasierte Softwareentwicklung: Vorgehensmodelle (klassisch und agil), Modellierungssprachen und Werkzeuge – mit besonderem Fokus auf UML. Von der Anforderungsspezifikation über Architektur- und Softwareentwurf bis zu Implementierung und Test haben wir Lösungen durchgängig modelliert. Hier habe ich erkannt, wie viel mir das Planen, Mitgestalten und präzise Entwerfen von Software bedeutet – und wie sehr gute Entwürfe alle folgenden Schritte effizienter machen.",
              },
              {
                title: "Analysis für Informatiker",
                badge: "Honorable Mention",
                grade: "2,3",
                description:
                  "Unter Wirtschaftsinformatik-Studierenden galt es als typisches Rausschmeißmodul – im Kern komplexe Uni-Mathematik. Ich habe es bewusst als Challenge gesehen, beim ersten Versuch zu bestehen und eine solide Note zu erreichen. Für meinen weiteren Werdegang hat es wenig praktischen Nutzen gebracht – daher nur Honorable Mention.",
              },
            ],
          },
        ],
      },
      right: {
        title: "Förderprogram Digital Talents - SICP",
        period: "2021 – 2022",
        logo: {
          alt: "SICP Digital Talents",
          imageUrl: "/logos/sicp.png",
        },
        paragraphs: [
          [
            {
              type: "text",
              value: "Parallel zum Studium: Teilnahme am ",
            },
            {
              type: "link",
              label: "Digital Talents Programm des SICP",
              url: "https://www.sicp.de/academy/for-students/digital-talents-program#digital-talents-program",
            },
            {
              type: "text",
              value:
                " – Förderprogramm für engagierte Studierende mit Digitalisierungsbezug. Praxisnahe Workshops, Einblicke in Partnerunternehmen, Mentoring, Praxisprojekte und berufliches Netzwerk. Dort Kontakte bei ",
            },
            {
              type: "link",
              label: "Eviden",
              url: "https://eviden.com/",
            },
            {
              type: "text",
              value:
                " geknüpft – der Einstieg in meinen ersten Werkstudentenjob.",
            },
          ],
        ],
      },
    },
  ],
  about: [],
  skills: [],
  projects: [],
  engineering: [],
};
