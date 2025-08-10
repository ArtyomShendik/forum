import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../services/api";
import type { Post } from "../../../types/post";

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => apiFetch<Post[]>(`/posts`),
  });
};