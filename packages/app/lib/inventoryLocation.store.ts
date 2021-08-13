import create from 'zustand';

interface InventoryLocationState {
  inventories: InventoryLocationsType[];
  setInventories: (inventories: InventoryLocationsType[]) => void;
}

export const useInventoryLocationStore = create<InventoryLocationState>(
  (set) => ({
    inventories: [],
    setInventories: (inventories) => set(() => ({ inventories })),
  })
);
