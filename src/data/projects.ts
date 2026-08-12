import type { ProjectData } from "./project";

const sharedTimeline: ProjectData["timeline"] = [
  {
    id: 1,
    title: "Photos uploaded",
    description: "Exterior, roof and heating system photos added",
    date: "12 July 2026",
    status: "Completed",
  },
  {
    id: 2,
    title: "AI analysis completed",
    description: "Energy performance and renovation options reviewed",
    date: "14 July 2026",
    status: "Completed",
  },
  {
    id: 3,
    title: "Product comparison",
    description: "Compare recommended renovation products",
    date: "Current step",
    status: "Current",
  },
  {
    id: 4,
    title: "Request contractor quotes",
    description: "Send the project scope to verified contractors",
    date: "Upcoming",
    status: "Upcoming",
  },
  {
    id: 5,
    title: "Installation",
    description: "Schedule and complete the selected renovation work",
    date: "Upcoming",
    status: "Upcoming",
  },
];

const sharedActivities: ProjectData["activities"] = [
  {
    id: 1,
    title: "AI report updated",
    description: "The highest-priority renovation measure was updated.",
    time: "18 minutes ago",
    type: "AI",
  },
  {
    id: 2,
    title: "Document uploaded",
    description: "The existing energy-label certificate was added.",
    time: "2 hours ago",
    type: "Document",
  },
  {
    id: 3,
    title: "Quotation received",
    description: "A contractor submitted a new quotation.",
    time: "Yesterday",
    type: "Quote",
  },
  {
    id: 4,
    title: "Task completed",
    description: "The latest property photos were reviewed.",
    time: "2 days ago",
    type: "Task",
  },
];

export const projects: ProjectData[] = [
  {
    id: 1,
    name: "The Hague Home Upgrade",
    address: "Laan van Meerdervoort 120",
    city: "The Hague",
    propertyType: "Detached house",
    yearBuilt: 1998,
    floorArea: 164,
    currentEnergyLabel: "D",
    targetEnergyLabel: "B",
    progress: 72,
    aiScore: 87,
    budget: "€18,500",
    subsidy: "€4,350",
    annualSaving: "€980",
    roi: "6.2 years",
    co2Reduction: "31%",
    status: "In progress",
    nextAction: "Compare roof insulation products",

    kpis: [
      {
        label: "Estimated Budget",
        value: "€18,500",
        description: "Total planned investment",
      },
      {
        label: "Available Subsidy",
        value: "€4,350",
        description: "Estimated eligible support",
      },
      {
        label: "Annual Saving",
        value: "€980",
        description: "Expected yearly energy saving",
      },
      {
        label: "Return on Investment",
        value: "6.2 years",
        description: "Estimated payback period",
      },
    ],

    recommendations: [
      {
        id: 1,
        title: "Roof insulation",
        category: "Insulation",
        priority: "High",
        estimatedCost: "€3,200",
        annualSaving: "€420/year",
        paybackPeriod: "5.8 years",
        status: "Recommended",
      },
      {
        id: 2,
        title: "Triple glazing",
        category: "Windows",
        priority: "High",
        estimatedCost: "€5,900",
        annualSaving: "€290/year",
        paybackPeriod: "8.1 years",
        status: "Planned",
      },
      {
        id: 3,
        title: "Hybrid heat pump",
        category: "Heating",
        priority: "Medium",
        estimatedCost: "€6,800",
        annualSaving: "€510/year",
        paybackPeriod: "7.4 years",
        status: "Recommended",
      },
      {
        id: 4,
        title: "Solar panels",
        category: "Renewable energy",
        priority: "Medium",
        estimatedCost: "€4,400",
        annualSaving: "€640/year",
        paybackPeriod: "6.6 years",
        status: "Planned",
      },
    ],

    timeline: sharedTimeline,
    activities: sharedActivities,
  },

  {
    id: 2,
    name: "Rotterdam Apartment",
    address: "Westblaak 82",
    city: "Rotterdam",
    propertyType: "Apartment",
    yearBuilt: 2006,
    floorArea: 91,
    currentEnergyLabel: "C",
    targetEnergyLabel: "A",
    progress: 48,
    aiScore: 91,
    budget: "€12,200",
    subsidy: "€2,700",
    annualSaving: "€690",
    roi: "5.8 years",
    co2Reduction: "39%",
    status: "AI analysis",
    nextAction: "Compare triple-glazing solutions",

    kpis: [
      {
        label: "Estimated Budget",
        value: "€12,200",
        description: "Total planned investment",
      },
      {
        label: "Available Subsidy",
        value: "€2,700",
        description: "Estimated eligible support",
      },
      {
        label: "Annual Saving",
        value: "€690",
        description: "Expected yearly energy saving",
      },
      {
        label: "Return on Investment",
        value: "5.8 years",
        description: "Estimated payback period",
      },
    ],

    recommendations: [
      {
        id: 1,
        title: "Triple glazing",
        category: "Windows",
        priority: "High",
        estimatedCost: "€4,900",
        annualSaving: "€310/year",
        paybackPeriod: "6.4 years",
        status: "Recommended",
      },
      {
        id: 2,
        title: "Ventilation upgrade",
        category: "Ventilation",
        priority: "High",
        estimatedCost: "€2,400",
        annualSaving: "€180/year",
        paybackPeriod: "7.2 years",
        status: "Planned",
      },
      {
        id: 3,
        title: "Smart thermostat",
        category: "Heating",
        priority: "Medium",
        estimatedCost: "€450",
        annualSaving: "€125/year",
        paybackPeriod: "3.6 years",
        status: "Recommended",
      },
      {
        id: 4,
        title: "Balcony insulation",
        category: "Insulation",
        priority: "Low",
        estimatedCost: "€1,800",
        annualSaving: "€95/year",
        paybackPeriod: "9.3 years",
        status: "Planned",
      },
    ],

    timeline: sharedTimeline,
    activities: sharedActivities,
  },

  {
    id: 3,
    name: "Utrecht Roof Renovation",
    address: "Kanaalstraat 91",
    city: "Utrecht",
    propertyType: "Terraced house",
    yearBuilt: 1987,
    floorArea: 118,
    currentEnergyLabel: "E",
    targetEnergyLabel: "C",
    progress: 91,
    aiScore: 84,
    budget: "€9,800",
    subsidy: "€2,100",
    annualSaving: "€610",
    roi: "5.1 years",
    co2Reduction: "29%",
    status: "Final review",
    nextAction: "Approve the roof-insulation quotation",

    kpis: [
      {
        label: "Estimated Budget",
        value: "€9,800",
        description: "Total planned investment",
      },
      {
        label: "Available Subsidy",
        value: "€2,100",
        description: "Estimated eligible support",
      },
      {
        label: "Annual Saving",
        value: "€610",
        description: "Expected yearly energy saving",
      },
      {
        label: "Return on Investment",
        value: "5.1 years",
        description: "Estimated payback period",
      },
    ],

    recommendations: [
      {
        id: 1,
        title: "Roof insulation",
        category: "Insulation",
        priority: "High",
        estimatedCost: "€4,100",
        annualSaving: "€390/year",
        paybackPeriod: "5.2 years",
        status: "Planned",
      },
      {
        id: 2,
        title: "Roof sealing",
        category: "Roofing",
        priority: "High",
        estimatedCost: "€2,100",
        annualSaving: "€110/year",
        paybackPeriod: "7.8 years",
        status: "Recommended",
      },
      {
        id: 3,
        title: "Solar panels",
        category: "Renewable energy",
        priority: "Medium",
        estimatedCost: "€4,600",
        annualSaving: "€650/year",
        paybackPeriod: "6.1 years",
        status: "Planned",
      },
      {
        id: 4,
        title: "Gutter replacement",
        category: "Roofing",
        priority: "Low",
        estimatedCost: "€1,250",
        annualSaving: "€40/year",
        paybackPeriod: "10 years",
        status: "Recommended",
      },
    ],

    timeline: sharedTimeline,
    activities: sharedActivities,
  },

  {
    id: 4,
    name: "Eindhoven Energy Upgrade",
    address: "Boschdijk 44",
    city: "Eindhoven",
    propertyType: "Semi-detached house",
    yearBuilt: 2003,
    floorArea: 143,
    currentEnergyLabel: "D",
    targetEnergyLabel: "B",
    progress: 24,
    aiScore: 82,
    budget: "€16,400",
    subsidy: "€3,900",
    annualSaving: "€910",
    roi: "6.8 years",
    co2Reduction: "34%",
    status: "Planning",
    nextAction: "Review hybrid heat-pump options",

    kpis: [
      {
        label: "Estimated Budget",
        value: "€16,400",
        description: "Total planned investment",
      },
      {
        label: "Available Subsidy",
        value: "€3,900",
        description: "Estimated eligible support",
      },
      {
        label: "Annual Saving",
        value: "€910",
        description: "Expected yearly energy saving",
      },
      {
        label: "Return on Investment",
        value: "6.8 years",
        description: "Estimated payback period",
      },
    ],

    recommendations: [
      {
        id: 1,
        title: "Hybrid heat pump",
        category: "Heating",
        priority: "High",
        estimatedCost: "€6,900",
        annualSaving: "€490/year",
        paybackPeriod: "7 years",
        status: "Recommended",
      },
      {
        id: 2,
        title: "Cavity-wall insulation",
        category: "Insulation",
        priority: "High",
        estimatedCost: "€2,600",
        annualSaving: "€280/year",
        paybackPeriod: "4.9 years",
        status: "Planned",
      },
      {
        id: 3,
        title: "Solar panels",
        category: "Renewable energy",
        priority: "Medium",
        estimatedCost: "€4,500",
        annualSaving: "€620/year",
        paybackPeriod: "6.3 years",
        status: "Recommended",
      },
      {
        id: 4,
        title: "Smart heating controls",
        category: "Heating",
        priority: "Low",
        estimatedCost: "€650",
        annualSaving: "€140/year",
        paybackPeriod: "4.6 years",
        status: "Planned",
      },
    ],

    timeline: sharedTimeline,
    activities: sharedActivities,
  },
];


export type ProjectDisplayTranslation = {
  name: string;
  propertyType: string;
  status: string;
  nextAction: string;
};

const projectDisplayTranslationsNL: Record<number, ProjectDisplayTranslation> = {
  1: {
    name: "Woningupgrade Den Haag",
    propertyType: "Vrijstaande woning",
    status: "In uitvoering",
    nextAction: "Vergelijk producten voor dakisolatie",
  },
  2: {
    name: "Appartementrenovatie Rotterdam",
    propertyType: "Appartement",
    status: "AI-analyse",
    nextAction: "Vergelijk oplossingen voor driedubbel glas",
  },
  3: {
    name: "Dakrenovatie Utrecht",
    propertyType: "Tussenwoning",
    status: "Eindcontrole",
    nextAction: "Keur de offerte voor dakisolatie goed",
  },
  4: {
    name: "Energie-upgrade Eindhoven",
    propertyType: "Twee-onder-een-kapwoning",
    status: "Planning",
    nextAction: "Bekijk opties voor een hybride warmtepomp",
  },
};

type ProjectDisplaySource = {
  id: number | string;
  name: string;
  propertyType: string;
  status: string;
  nextAction: string;
};

export function getProjectDisplayData(
  project: ProjectDisplaySource,
  language: string,
): ProjectDisplayTranslation {
  if (language.startsWith("nl") && typeof project.id === "number") {
    return (
      projectDisplayTranslationsNL[project.id] ?? {
        name: project.name,
        propertyType: project.propertyType,
        status: project.status,
        nextAction: project.nextAction,
      }
    );
  }

  return {
    name: project.name,
    propertyType: project.propertyType,
    status: project.status,
    nextAction: project.nextAction,
  };
}
