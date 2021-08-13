import create from 'zustand';

interface State {
  user: null | UserType;
  setUser: (user: UserType) => void;
  updateUser: (user: UserType) => void;
  logout: () => void;
}

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user,
    })),
  logout: () =>
    set(() => ({
      user: null,
    })),
  updateUser: (user) =>
    set(() => ({
      user,
    })),
}));
