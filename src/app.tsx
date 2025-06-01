import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/auth-context.provider';
import AppRoutes from './routes/app-routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
