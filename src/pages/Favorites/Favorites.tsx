import type { FC } from 'react';
import { useFavoritesPosts } from '../../store/favorites.store';
import { PostCard } from '../../features/posts/components/PostCard/PostCard';
import { Button } from 'antd';
import styles from './Favorites.module.scss';

export const Favorites: FC = () => {
  const { favoritesPosts, clearFavorites } = useFavoritesPosts();

  const handleClearFavorites = () => {
    clearFavorites();
  };

  return (
    <div className={styles['favorites']}>
      <div className={styles['favorites__clear-button']}>
        {favoritesPosts.length > 0 && (
          <Button onClick={handleClearFavorites}>Очистить избранное</Button>
        )}
      </div>
      {favoritesPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      {favoritesPosts.length === 0 && <div>Нет избранных постов</div>}
    </div>
  );
};
