import { QueryProvider } from './providers/QueryProvider';
import { AntdProvider } from './providers/AntdProvider';
import { RouterProvider } from './providers/RouterProvider';
import 'antd/dist/reset.css';

function App() {
  return (
    <QueryProvider>
      <AntdProvider>
        <RouterProvider />
      </AntdProvider>
    </QueryProvider>
  );
}

export default App;
