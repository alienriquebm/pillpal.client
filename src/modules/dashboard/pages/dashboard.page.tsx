import { useAbility } from '../../../hooks/use-ability';
import { ActionsEnum } from '../../../types/actions.enum';
import { SubjectsEnum } from '../../../types/subjects.enum';
import { useGetTestList } from '../hooks/use-get-test-list';

export function DashboardPage() {
  const { data, isLoading } = useGetTestList();
  const ability = useAbility();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  console.log(data);
  return (
    <div>
      <h1>Dashboard Page</h1>
      <hr />
      <h3>Test List</h3>
      {ability.can(ActionsEnum.manage, SubjectsEnum.Dashboard) && (
        <button>Admin only button</button>
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
    </div>
  );
}
