import { Button } from 'antd';
import { SubjectsEnum } from '@/types/subjects.enum';
import { useGetTestList } from '../hooks/use-get-test-list';
import { useAbility } from '@/hooks/use-ability';
import { DashboardLayout } from '../components/dashboard.layout';
import { ErrorAction } from '@/components/error-action';
import { ActionsEnum } from '@/types/actions.enum';
import { withErrorBoundary } from '@/hoc/with-error-boundary';

function DashboardPageComponent() {
  const { data, isLoading, error, refetch } = useGetTestList();
  const ability = useAbility();
  if (isLoading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorAction error={error} onRetry={refetch} />
      </DashboardLayout>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }
  console.log(data);

  return (
    <DashboardLayout>
      <h1>Dashboard Page</h1>
      <hr />
      <h3>Test List</h3>
      {ability.can(ActionsEnum.manage, SubjectsEnum.Dashboard) && (
        <Button type="primary">Admin only button</Button>
      )}
      {data.map(item => (
        <div key={item.id} className="border p-4 mb-2">
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>Email:</strong> {item.email}
          </p>
          <p>
            <strong>Phone:</strong> {item.phone}
          </p>
          <p>
            <strong>Address:</strong> {item.address}
          </p>
          <p>
            <strong>Birthdate:</strong> {item.birthdate}
          </p>
          <p>
            <strong>Active:</strong> {item.isActive ? 'Yes' : 'No'}
          </p>
        </div>
      ))}
    </DashboardLayout>
  );
}

export const DashboardPage = withErrorBoundary(DashboardPageComponent);
