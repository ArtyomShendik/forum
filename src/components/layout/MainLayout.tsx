import type { FC } from 'react';
import { Container, Header } from '../ui';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
