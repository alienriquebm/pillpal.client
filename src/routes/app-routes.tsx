import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from './public-route';
import { LoginPage } from '../modules/auth/login';
import { PrivateRoute } from './private-route';
import { LOGIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, ADMIN_ONLY_TEST_ROUTE } from './routes';
import { DashboardPage } from '../modules/dashboard/pages/dashboard.page';
import { ActionsEnum } from '../types/actions.enum';
import { SubjectsEnum } from '../types/subjects.enum';
import NotFound from './components/not-found';
import { RootRedirect } from './components/root-route';
import NotAllowed from './components/not-allowed';
import { CanRoute } from '../context/ability/can-route';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<RootRedirect />} />
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
            <CanRoute I={ActionsEnum.read} a={SubjectsEnum.Dashboard} fallback={<NotAllowed />}>
              <DashboardPage />
            </CanRoute>
          </PrivateRoute>
        }
      />
      <Route
        path={ADMIN_ONLY_TEST_ROUTE}
        element={
          <PrivateRoute>
            <CanRoute I={ActionsEnum.read} a={SubjectsEnum.AdminOnlyTest} fallback={<NotAllowed />}>
              <div>Ruta de test solo para admins</div>
            </CanRoute>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
