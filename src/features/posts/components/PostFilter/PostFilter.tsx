import { type FC } from 'react';
import { Input } from 'antd';
import styles from './PostFilter.module.scss';

interface Props {
  searchValue: string;
  onSearch: (searchValue: string) => void;
}

export const PostFilter: FC<Props> = ({ searchValue, onSearch }) => {
  return (
    <div className={styles['post-filter']}>
      <Input
        value={searchValue}
        onChange={e => onSearch(e.target.value)}
        placeholder="Поиск по постам"
        allowClear
      />
    </div>
  );
};
