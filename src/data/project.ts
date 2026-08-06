export interface ProjectKPI {
    label: string;
    value: string;
    description: string;
  }
  
  export interface ProjectRecommendation {
    id: number;
    title: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    estimatedCost: string;
    annualSaving: string;
    paybackPeriod: string;
    status: "Recommended" | "Planned" | "Completed";
  }
  
  export interface ProjectTimelineItem {
    id: number;
    title: string;
    description: string;
    date: string;
    status: "Completed" | "Current" | "Upcoming";
  }
  
  export interface ProjectActivity {
    id: number;
    title: string;
    description: string;
    time: string;
    type: "AI" | "Document" | "Quote" | "Task";
  }
  
  export interface ProjectData {
    id: number;
    name: string;
    address: string;
    city: string;
    propertyType: string;
    yearBuilt: number;
    floorArea: number;
    currentEnergyLabel: string;
    targetEnergyLabel: string;
    progress: number;
    aiScore: number;
    budget: string;
    subsidy: string;
    annualSaving: string;
    roi: string;
    co2Reduction: string;
    status: string;
    nextAction: string;
  
    kpis: ProjectKPI[];
    recommendations: ProjectRecommendation[];
    timeline: ProjectTimelineItem[];
    activities: ProjectActivity[];
  }
  
  export const projectData: ProjectData = {
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
  
    nextAction: "Roof insulation",
  
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
  
    timeline: [
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
        description: "Compare recommended insulation products",
        date: "Current Step",
        status: "Current",
      },
      {
        id: 4,
        title: "Request contractor quotes",
        description: "Send project scope to verified contractors",
        date: "Upcoming",
        status: "Upcoming",
      },
      {
        id: 5,
        title: "Installation",
        description: "Schedule and execute renovation work",
        date: "Upcoming",
        status: "Upcoming",
      },
    ],
  
    activities: [
      {
        id: 1,
        title: "AI report updated",
        description: "Roof insulation marked as highest priority.",
        time: "18 minutes ago",
        type: "AI",
      },
      {
        id: 2,
        title: "Document uploaded",
        description: "Energy label certificate added.",
        time: "2 hours ago",
        type: "Document",
      },
      {
        id: 3,
        title: "Quotation received",
        description: "GreenBuild submitted quotation.",
        time: "Yesterday",
        type: "Quote",
      },
      {
        id: 4,
        title: "Task completed",
        description: "Heating system photos reviewed.",
        time: "2 days ago",
        type: "Task",
      },
    ],
  };