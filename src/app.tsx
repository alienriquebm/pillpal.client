import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/auth-context.provider';
import AppRoutes from './routes/app-routes';
import { ReactQueryProvider } from './providers';
import { StyleProvider } from '@ant-design/cssinjs';

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <StyleProvider layer>
            <AppRoutes />
          </StyleProvider>
        </AuthProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
