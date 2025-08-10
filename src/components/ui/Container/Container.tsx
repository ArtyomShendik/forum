import type { FC } from 'react';
import styles from './Container.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return <div className={styles['container']}>{children}</div>;
};
