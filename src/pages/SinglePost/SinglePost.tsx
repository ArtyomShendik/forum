import { useState, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSinglePost } from '../../features/posts/hooks/useSinglePost';
import { PostCard } from '../../features/posts/components/PostCard/PostCard';
import { Spinner } from '../../components/ui';
import { useCommentByPost } from '../../features/comments/hooks/useCommentByPost';
import { CommentCard } from '../../features/comments/components/CommentCard/CommentCard';
import { CommentForm } from '../../features/comments/components/CommentForm/CommentForm';
import { Button, Modal } from 'antd';
import type { Comment } from '../../types/comment';

export const SinglePost: FC = () => {
  const { id } = useParams();
  const { data: post, isLoading, error } = useSinglePost(Number(id));
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useCommentByPost(Number(id));

  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddComment = (newComment: Omit<Comment, 'id'>) => {
    const commentWithId: Comment = {
      ...newComment,
      id: Date.now(),
    };

    setLocalComments(prev => [commentWithId, ...prev]);
    setIsFormVisible(false);
  };

  const allComments = [...localComments, ...(comments || [])];

  if (isLoading || isCommentsLoading) return <Spinner />;
  if (error || commentsError) return <div>Ошибка загрузки поста</div>;
  if (!post) return <div>Пост не найден</div>;

  return (
    <div>
      <PostCard post={post} isSingle={true} />

      <div style={{ marginTop: '24px' }}>
        <Button
          type="primary"
          onClick={() => setIsFormVisible(true)}
          style={{ marginBottom: '16px' }}
        >
          Добавить комментарий
        </Button>

        {localComments.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3>Новые комментарии</h3>
            {localComments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        {comments && comments.length > 0 && (
          <div>
            <h3>Существующие комментарии</h3>
            {comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        {allComments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Пока нет комментариев. Будьте первым!
          </div>
        )}
      </div>

      <Modal
        title="Добавить комментарий"
        open={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        footer={null}
        width={600}
      >
        <CommentForm
          onSubmit={handleAddComment}
          onCancel={() => setIsFormVisible(false)}
        />
      </Modal>
    </div>
  );
};
