import { DashboardLayout } from '../components/dashboard.layout';

import { withErrorBoundary } from '@/hoc/with-error-boundary';
import { TestData } from '../components/test-data';

function DashboardPageComponent() {
  return (
    <DashboardLayout>
      <h1>Dashboard Page</h1>
      <hr />
      <TestData />
    </DashboardLayout>
  );
}

export const DashboardPage = withErrorBoundary(DashboardPageComponent);
