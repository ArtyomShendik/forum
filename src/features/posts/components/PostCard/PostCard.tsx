import { Card, Button, Popconfirm } from 'antd';
import type { Post } from '../../../../types/post';
import { useNavigate } from 'react-router-dom';
import { useDeletePost } from '../../hooks/useDeletePost';
import styles from './PostCard.module.scss';
import { useFavoritesPosts } from '../../../../store/favorites.store';
import { DeleteOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface Props {
  post: Post;
  isSingle?: boolean;
}

export const PostCard = ({ post, isSingle }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: deletePost, isPending } = useDeletePost();
  const { addFavoritePost, removeFavoritePost, isFavoritePost } =
    useFavoritesPosts();

  const handleNavigate = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const handleDelete = (id: number) => {
    deletePost(id);
  };

  const handleAddToFavorites = () => {
    addFavoritePost(post);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card title={post.title}>
      <p>{post.body}</p>
      <div className={styles['post-card__actions']}>
        {isFavoritePost(post.id) ? (
          <Button onClick={() => removeFavoritePost(post.id)}>
            Удалить из избранного
          </Button>
        ) : (
          <Button onClick={() => handleAddToFavorites()}>
            Добавить в ибранное
          </Button>
        )}
        {!isSingle && (
          <Button onClick={() => handleNavigate(post.id)}>Подробнее</Button>
        )}
        <Button
          type="text"
          icon={
            liked ? (
              <HeartFilled style={{ color: '#ff4d4f' }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={handleLike}
          className={styles['like-button']}
        >
          {liked ? 'Лайкнуто' : 'Лайк'}
        </Button>
        <Popconfirm
          title="Удалить пост?"
          description="Это действие нельзя отменить"
          onConfirm={() => handleDelete(post.id)}
          okText="Да"
          cancelText="Нет"
        >
          {!isSingle && (
            <Button danger loading={isPending} icon={<DeleteOutlined />}>
              Удалить
            </Button>
          )}
        </Popconfirm>
      </div>
    </Card>
  );
};
