import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../../services/api';
import type { Post } from '../../../types/post';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => apiFetch<Post>(`/posts/${postId}`, {
      method: 'DELETE',
    }),
    onSuccess: (_, deletedPostId) => {
      queryClient.setQueryData(['posts'], (oldData: Post[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter(post => post.id !== deletedPostId);
      });

    },
    onError: (error) => {
      console.error('Ошибка при удалении поста:', error);
    },
  });
};