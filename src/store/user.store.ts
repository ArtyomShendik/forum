import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

const mockUser: User = {
  id: 1,
  name: 'Artsem Frontend',
  email: 'ivan@example.com',
  phone: '+375 44 777 77 77',
  address: 'ул. Пушкина, д. 10, кв. 5',
  city: 'Москва',
  country: 'Россия',
  birthDate: '1990-05-15',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: mockUser,
      setUser: (user: User) => set({ user }),
      updateUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      version: 1,
    }
  )
);
