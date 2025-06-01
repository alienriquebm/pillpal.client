import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicRoute } from './public-route';
import { LoginPage } from '../modules/auth/login';
import { PrivateRoute } from './private-route';
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from './routes';
import { DashboardPage } from '../modules/dashboard/pages/dashboard.page';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path={LOGIN_ROUTE}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Rutas privadas */}
      <Route
        path={DASHBOARD_ROUTE}
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
}
