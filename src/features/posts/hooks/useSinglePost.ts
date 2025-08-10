import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../services/api";
import type { Post } from "../../../types/post";

export const useSinglePost = (postId: number) => {
  return useQuery<Post>({
    queryKey: ['posts', postId],
    queryFn: () => apiFetch<Post>(`/posts/${postId}`),
  });
};