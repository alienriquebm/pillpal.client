import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/auth-context.provider';
import AppRoutes from './routes/app-routes';
import { ReactQueryProvider } from './providers';

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
