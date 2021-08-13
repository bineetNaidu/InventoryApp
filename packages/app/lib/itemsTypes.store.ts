import create from 'zustand';

interface ItemsTypesStoreState {
  itemsTypes: ItemTypesType[];
  setItemsTypes: (itemsTypes: ItemTypesType[]) => void;
}

export const useItemTypesStore = create<ItemsTypesStoreState>((set) => ({
  itemsTypes: [],
  setItemsTypes: (itemsTypes) => set(() => ({ itemsTypes })),
}));
