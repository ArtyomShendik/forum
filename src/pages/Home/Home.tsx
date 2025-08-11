import { useState, useEffect, type FC } from 'react';
import { usePosts } from '../../features/posts/hooks/usePosts';
import { PostCard } from '../../features/posts/components/PostCard/PostCard';
import { Spinner } from '../../components/ui';
import styles from './Home.module.scss';
import { PostFilter } from '../../features/posts/components/PostFilter/PostFilter';
import { useDebounce } from '../../features/posts/hooks/useDebounce';
import { PostForm } from '../../features/posts/components/PostForm/PostForm';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Post } from '../../types/post';
import { Pagination } from 'antd';

export const Home: FC = () => {
  const { data: posts, isLoading, error, isError } = usePosts();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddPost = (newPost: Omit<Post, 'id' | 'userId'>) => {
    const postWithId: Post = {
      ...newPost,
      id: Date.now(),
      userId: 1,
    };

    setLocalPosts(prev => [postWithId, ...prev]);
    setCurrentPage(1);
  };

  const allPosts = [...localPosts, ...(posts || [])];

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchValue]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPagePosts = filteredPosts.slice(startIndex, endIndex);

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

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className={styles['home']}>
        <h1>Главная страница</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Пока нет постов. Создайте первый!</p>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsFormVisible(true)}
            size="large"
          >
            Создать пост
          </Button>
        </div>

        <PostForm
          isVisible={isFormVisible}
          onCancel={() => setIsFormVisible(false)}
          onSubmit={handleAddPost}
        />
      </div>
    );
  }

  return (
    <div className={styles['home']}>
      <div className={styles['home-header']}>
        <h1>Главная страница</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsFormVisible(true)}
        >
          Создать пост
        </Button>
      </div>

      <PostFilter searchValue={searchValue} onSearch={setSearchValue} />

      {filteredPosts.length > 0 ? (
        <>
          <p>Найдено постов: {filteredPosts.length}</p>
          <div className={styles['posts-container']}>
            {currentPagePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length > pageSize && (
            <div className={styles['pagination']}>
              <Pagination
                total={filteredPosts.length}
                pageSize={pageSize}
                current={currentPage}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      ) : (
        <div>Поиск не дал результатов</div>
      )}

      <PostForm
        isVisible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSubmit={handleAddPost}
      />
    </div>
  );
};
