import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../services/api";
import type { Comment } from "../../../types/comment";

export const useCommentByPost = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => apiFetch<Comment[]>(`/posts/${postId}/comments`),
  });
};