import type { DetailSectionMedia } from "../components/DetailMedia";

export interface SubsystemModelDiagram {
  kind: "bdd" | "ibd" | "concept" | "demo" | "stm";
  title: string;
  media: DetailSectionMedia;
}

export interface SubsystemModelGroup {
  ap: string;
  subsystem: string;
  summary: string;
  diagrams: SubsystemModelDiagram[];
}

export interface ProjectModelsPage {
  projectSlug: string;
  title: string;
  backHref: string;
  backLabel: string;
  groups: SubsystemModelGroup[];
}

const MODELS_BASE = "/media/fastgate/models";

export const fastgateModelsPage: ProjectModelsPage = {
  projectSlug: "fastgate",
  title: "FastGate – Subsystem-Modelle",
  backHref: "/projekte/fastgate",
  backLabel: "← Zurück zur FastGate-Übersicht",
  groups: [
    {
      ap: "AP2",
      subsystem: "Apron Data Collector System",
      summary:
        "Für die Sensorerfassung auf dem Flughafenvorfeld wurden verschiedene Sensoren und Hardwarekomponenten eingesetzt. Dazu gehörten 3D- und 2D-LiDAR-Sensoren, Vision- und Thermal-Kameras, eine ZED-Box sowie ein PoE-Switch. Die erfassten Sensordaten wurden anschließend an das Central Data Space System gestreamt, wo sie weiterverarbeitet und analysiert werden konnten.\n\nZiel dieses Subsystems war es, Daten für die Objekterkennung auf dem Vorfeld bereitzustellen. Dabei sollten insbesondere relevante Objekte wie Flugzeuge, Fahrzeuge, Hütchen bzw. Markierungselemente sowie Personen erkannt werden. Auch dieses Subsystem wurde im Vorfeld mithilfe von Block Definition Diagrams und Internal Block Diagrams spezifiziert, um die Systemstruktur sowie die Schnittstellen und Datenflüsse eindeutig zu beschreiben.\n\nMithilfe der erstellten Diagramme wurde systematisch geplant, welche Sensoren für die Erfassung der relevanten Informationen auf dem Flughafenvorfeld benötigt werden. Gleichzeitig konnte definiert werden, welche Daten von den jeweiligen Sensoren bereitgestellt werden und wie diese innerhalb des Systems weiterverarbeitet werden sollen.",
      diagrams: [
        {
          kind: "bdd",
          title: "Subsystem-Struktur (bdd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/bdd-ap2.png`,
            alt: "bdd Apron Data Collector System mit Sensor- und Hardware-Komponenten",
            caption: "Apron Data Collector System – Block Definition Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "ibd",
          title: "Architektur & Datenflüsse (ibd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ibd-ap2.png`,
            alt: "ibd Apron Data Collector Architecture mit Sensor-Datenflüssen zum Switch",
            caption:
              "Apron Data Collector Architecture – Internal Block Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "concept",
          title: "Sensor-Konzept (AP2)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ap2-sensor-konzept.png`,
            alt: "AP2 Sensor-Konzept: Platzierung von 3D-LiDAR, 2D-LiDAR, Vision- und Thermal-Kameras, ZED-Box und PoE-Switch am Vorfeld und an der Fluggastbrücke",
            caption:
              "Sensor-Konzept – Anordnung und Sichtfelder der Sensorik am Gate.",
            lightboxSize: "large",
          },
        },
      ],
    },
    {
      ap: "AP3",
      subsystem: "Central Data Space System",
      summary:
        "Das Central Data Space System bildet die zentrale Datenplattform und damit das Herzstück des Gesamtsystems. Es nimmt unter anderem Daten aus dem Bridge Operation System auf und bestimmt daraus den aktuellen Zustand der Fluggastbrücke. Diese Zustandsinformationen werden anschließend an das HMI System weitergegeben und dort im digitalen Zwilling visualisiert.\n\nDarüber hinaus verarbeitet das Central Data Space System die Sensordaten des Apron Data Collector Systems. Auf Basis dieser Daten werden relevante Objekte auf dem Flughafenvorfeld erkannt, beispielsweise Flugzeuge, Fahrzeuge, Personen oder Markierungselemente. Die Objekterkennung erfolgt mithilfe feinabgestimmter YOLO-Modelle. Auch die erkannten Objekte werden an den digitalen Zwilling übermittelt und dort visualisiert.\n\nNeben der Zustandsbestimmung der Fluggastbrücke und der Objekterkennung stellt das Central Data Space System weitere Microservices bereit, die von anderen Subsystemen genutzt werden können.",
      diagrams: [
        {
          kind: "bdd",
          title: "Subsystem-Struktur (bdd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/bdd-ap3.png`,
            alt: "bdd Central Data Space System mit Kafka, Cassandra und Microservices",
            caption: "Central Data Space System – Block Definition Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "ibd",
          title: "Architektur & Datenflüsse (ibd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ibd-ap3.png`,
            alt: "ibd Central Data Space Architecture mit Kafka, Cassandra und Spark",
            caption: "Central Data Space Architecture – Internal Block Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "concept",
          title: "Infrastruktur und Schnittstellen (AP3)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ap3-infrastruktur-schnittstellen.png`,
            alt: "AP3 Infrastruktur und Schnittstellen: HD-Mapping-Plattform mit Kafka, Cassandra und Spark-Services, Daten von AP2 und SKYport, Ausgabe an AP4 und AP5",
            caption:
              "Infrastruktur und Schnittstellen – HD-Mapping-Plattform mit Datenbank- und Software-Services.",
            lightboxSize: "large",
          },
        },
      ],
    },
    {
      ap: "AP4",
      subsystem: "Bridge Operation System",
      summary:
        "Das Bridge Operation System ist für die Erfassung und Steuerung der Fluggastbrücke zuständig. Hierfür werden Sensoren an der Brücke eingesetzt, um deren aktuellen Zustand sowie ihre Position zu erfassen. Die ermittelten Daten werden anschließend an das Central Data Space System übertragen und dort weiterverarbeitet.\n\nDarüber hinaus empfängt das Bridge Operation System Steuerungsbefehle aus dem Central Data Space System und setzt diese an der Fluggastbrücke um. Die technische Umsetzung erfolgt über einen Cobot, der das bestehende Bedienpult der Fluggastbrücke bedient. Dadurch handelt es sich bei der Lösung um einen Retrofit-Ansatz, bei dem die vorhandene Infrastruktur weiterverwendet und durch zusätzliche Automatisierungskomponenten erweitert wird.",
      diagrams: [
        {
          kind: "bdd",
          title: "Subsystem-Struktur (bdd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/bdd-ap4.png`,
            alt: "bdd Bridge Operation System mit Sensoren und Cobot",
            caption: "Bridge Operation System – Block Definition Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "ibd",
          title: "Architektur & Datenflüsse (ibd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ibd-ap4.png`,
            alt: "ibd Bridge Operation System Architecture mit Sensor- und Steuerungsflüssen",
            caption:
              "Bridge Operation System Architecture – Internal Block Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "concept",
          title: "Steuerungsarchitektur (AP4)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ap4-steuerungsarchitektur.png`,
            alt: "AP4 Steuerungsarchitektur: Kafka, Beckhoff IPC, Cobot, Siemens S7 300 und ET200M mit Fahrbefehlen, Sensorwerten und physischer Trennung autonomer Betrieb",
            caption:
              "Steuerungsarchitektur – High-Driving Automation der Fluggastbrücke.",
            lightboxSize: "large",
          },
        },
      ],
    },
    {
      ap: "AP5",
      subsystem: "HMI System",
      summary:
        "Das HMI System umfasst drei zentrale Benutzerschnittstellen. Die erste Schnittstelle ist ein digitaler Zwilling auf dem iPad, über den die erkannten Objekte auf dem Flughafenvorfeld visualisiert werden. Zusätzlich kann über diese Anwendung die Fluggastbrücke überwacht und gesteuert werden.\n\nDie zweite Schnittstelle ist eine Apple Watch für die Mitarbeitenden auf dem Vorfeld. Sie unterstützt die Kommunikation während der operativen Abläufe und ermöglicht es den Beteiligten, Statusinformationen auszutauschen sowie gegenseitige Freigaben zu erteilen.\n\nAls dritte Schnittstelle kommt eine VR-Brille zum Einsatz. Diese dient insbesondere der Schulung von Mitarbeitenden, indem Abläufe und Situationen im Zusammenhang mit der Fluggastbrücke virtuell dargestellt und trainiert werden können.\n\nMithilfe von State Machine Diagrams wurden die Freigabeprozesse innerhalb der Turnaround Operations modelliert und geplant. Dabei wurden insbesondere die verschiedenen Freigabestufen sowie die Übergänge zwischen den einzelnen Zuständen definiert. Die modellierten State Machines waren vollständig automatisiert ausführbar und konnten dadurch auch zur Simulation der geplanten Abläufe genutzt werden.\n\nAuf Basis dieser State Machines wurde anschließend die Apple-Watch-App entwickelt. Die App unterstützt die Mitarbeitenden während ihrer operativen Tätigkeiten, indem sie die modellierten Freigabeprozesse digital abbildet und eine strukturierte Kommunikation zwischen den beteiligten Personen ermöglicht.",
      diagrams: [
        {
          kind: "bdd",
          title: "Subsystem-Struktur (bdd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/bdd-ap5.png`,
            alt: "bdd HMI System mit Apple Watch, iPad, VR-Brille und Rollen",
            caption: "HMI System – Block Definition Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "ibd",
          title: "Architektur & Interaktionen (ibd)",
          media: {
            type: "image",
            src: `${MODELS_BASE}/ibd-ap5.png`,
            alt: "ibd HMI System Architecture mit Interaktionen zwischen Staff und Apple Watch",
            caption: "HMI System Architecture – Internal Block Diagram",
            lightboxSize: "large",
          },
        },
        {
          kind: "stm",
          title: "State Machines (stm)",
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
          kind: "demo",
          title: "Smartwatch-App (Demo)",
          media: {
            type: "video",
            src: `${MODELS_BASE}/ap5-uhr-demo.mp4`,
            mimeType: "video/mp4",
            title: "FastGate AP5: Smartwatch-App Demo",
            caption:
              "Demo der Smartwatch-Oberfläche für die Koordination am Vorfeld (Ramp Agent, Loader, Terminal Agent).",
          },
        },
        {
          kind: "demo",
          title: "iPad-Oberfläche (Demo)",
          media: {
            type: "video",
            src: `${MODELS_BASE}/ap5-ipad-demo.mp4`,
            mimeType: "video/mp4",
            title: "FastGate AP5: iPad Demo",
            caption:
              "Demo der iPad-Benutzeroberfläche zur Anzeige von Sensor- und Vorfelddaten.",
          },
        },
      ],
    },
  ],
};

const projectModelsBySlug: Record<string, ProjectModelsPage> = {
  fastgate: fastgateModelsPage,
};

export function getProjectModelsBySlug(
  slug: string | undefined,
): ProjectModelsPage | undefined {
  if (!slug) return undefined;
  return projectModelsBySlug[slug];
}
