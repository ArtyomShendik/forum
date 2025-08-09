import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
      {children}
    </ConfigProvider>
  );
};
