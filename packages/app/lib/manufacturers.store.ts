import create from 'zustand';

interface ManufacturersState {
  manufacturers: ManufacturersType[];
  setManufacturers: (manufacturers: ManufacturersType[]) => void;
}

export const useManufacturersStore = create<ManufacturersState>((set) => ({
  manufacturers: [],
  setManufacturers: (manufacturers) => set(() => ({ manufacturers })),
}));
