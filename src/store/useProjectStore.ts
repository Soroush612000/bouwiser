import { create } from "zustand";

export interface PropertyInfo {
  street: string;
  city: string;
  postalCode: string;
  propertyType: string;
  floorArea: number;
  yearBuilt: number;
  energyLabel: string;
}

export interface RenovationGoals {
  insulation: boolean;
  solarPanels: boolean;
  heatPump: boolean;
  windows: boolean;
  ventilation: boolean;
}

interface ProjectStore {
  property: PropertyInfo;

  goals: RenovationGoals;

  photos: File[];

  setProperty: (data: Partial<PropertyInfo>) => void;

  setGoals: (data: Partial<RenovationGoals>) => void;

  addPhotos: (files: File[]) => void;

  clearProject: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  property: {
    street: "",
    city: "",
    postalCode: "",
    propertyType: "",
    floorArea: 0,
    yearBuilt: 0,
    energyLabel: "",
  },

  goals: {
    insulation: false,
    solarPanels: false,
    heatPump: false,
    windows: false,
    ventilation: false,
  },

  photos: [],

  setProperty: (data) =>
    set((state) => ({
      property: {
        ...state.property,
        ...data,
      },
    })),

  setGoals: (data) =>
    set((state) => ({
      goals: {
        ...state.goals,
        ...data,
      },
    })),

  addPhotos: (files) =>
    set((state) => ({
      photos: [...state.photos, ...files],
    })),

  clearProject: () =>
    set({
      property: {
        street: "",
        city: "",
        postalCode: "",
        propertyType: "",
        floorArea: 0,
        yearBuilt: 0,
        energyLabel: "",
      },

      goals: {
        insulation: false,
        solarPanels: false,
        heatPump: false,
        windows: false,
        ventilation: false,
      },

      photos: [],
    }),
}));