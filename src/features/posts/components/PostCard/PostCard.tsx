import { Card, Button, Popconfirm } from 'antd';
import type { Post } from '../../../../types/post';
import { useNavigate } from 'react-router-dom';
import { useDeletePost } from '../../hooks/useDeletePost';
import styles from './PostCard.module.scss';

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleNavigate = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  return (
    <Card title={post.title}>
      <p>{post.body}</p>
      <div className={styles['post-card__actions']}>
        <Button>Избранное</Button>
        <Button onClick={() => handleNavigate(post.id)}>Подробнее</Button>
        <Popconfirm
          title="Удалить пост?"
          description="Это действие нельзя отменить"
          onConfirm={() => handleDelete(post.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button danger loading={isPending}>
            Удалить
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
};
