import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/auth-context.provider';
import AppRoutes from './routes/app-routes';
import { ReactQueryProvider } from './providers';
import { StyleProvider } from '@ant-design/cssinjs';
import { AbilityProvider } from './context/ability/ability-context.provider';

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <AbilityProvider>
            <StyleProvider layer>
              <AppRoutes />
            </StyleProvider>
          </AbilityProvider>
        </AuthProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
