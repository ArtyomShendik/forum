import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Post } from '../types/post';

export const useFavoritesPosts = create<{
  favoritesPosts: Post[];
  addFavoritePost: (post: Post) => void;
  removeFavoritePost: (id: number) => void;
  isFavoritePost: (id: number) => boolean;
  clearFavorites: () => void;
}>()(
  persist(
    (set, get) => ({
      favoritesPosts: [],
      addFavoritePost: (post: Post) => {
        const currentFavorites = get().favoritesPosts;
        if (!currentFavorites.some(favPost => favPost.id === post.id)) {
          set({ favoritesPosts: [...currentFavorites, post] });
        }
      },
      removeFavoritePost: (id: number) => {
        set({
          favoritesPosts: get().favoritesPosts.filter(post => post.id !== id)
        });
      },
      isFavoritePost: (id: number) => {
        return get().favoritesPosts.some(post => post.id === id);
      },
      clearFavorites: () => {
        set({ favoritesPosts: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);