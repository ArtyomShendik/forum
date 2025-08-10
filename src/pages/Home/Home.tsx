import { useState, type FC } from 'react';
import { usePosts } from '../../features/posts/hooks/usePosts';
import { PostCard } from '../../features/posts/components/PostCard/PostCard';
import { Spinner } from '../../components/ui';
import styles from './Home.module.scss';
import { PostFilter } from '../../features/posts/components/PostFilter/PostFilter';
import { useDebounce } from '../../features/posts/hooks/useDebounce';

export const Home: FC = () => {
  const { data: posts, isLoading, error, isError } = usePosts();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || error) {
    return (
      <div>
        Ошибка загрузки постов: {error?.message || 'Неизвестная ошибка'}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div>Посты не найдены</div>;
  }

  return (
    <div className={styles['home']}>
      <h1>Главная страница</h1>
      {filteredPosts && filteredPosts.length > 0 && (
        <p>Найдено постов: {filteredPosts.length}</p>
      )}
      {!filteredPosts ||
        (filteredPosts.length === 0 && <div>Поиск не дал результатов</div>)}
      <PostFilter searchValue={searchValue} onSearch={setSearchValue} />
      <div className={styles['posts-container']}>
        {filteredPosts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
