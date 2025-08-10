import type { FC } from 'react';
import { Container } from '../Container/Container';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const navigationItems = [
    { path: '/', title: 'Главная' },
    { path: '/profile', title: 'Профиль' },
  ];

  return (
    <header className={styles['header']}>
      <Container>
        <nav className={styles['nav']}>
          {navigationItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={styles['nav__link']}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
};
