import create from 'zustand';

interface ItemsState {
  items: ItemsType[];
  setItems: (items: ItemsType[]) => void;
  addItem: (item: ItemsType) => void;
  removeItem: (item: ItemsType) => void;
  updateItem: (id: number, item: ItemsType) => void;
}

export const useItemStore = create<ItemsState>((set) => ({
  items: [],
  setItems: (items) => set(() => ({ items })),
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (item) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== item.id) })),
  updateItem: (id, item) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? item : i)) })),
}));
