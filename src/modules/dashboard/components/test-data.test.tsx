import { render, waitFor } from '@test/test-wrapper';
import { TestData } from './test-data';

vi.mock('../hooks/use-get-test-list', () => ({
  useGetTestList: () => ({
    data: [],
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));
vi.mock('@/hooks/use-ability', () => ({
  useAbility: () => ({
    can: () => false,
  }),
}));

const componentRender = () => render(<TestData />);

describe('Test Data', () => {
  it('should render the title', async () => {
    const { getByText } = componentRender();
    const title = getByText('Test List');
    await waitFor(() => {
      expect(title).toBeInTheDocument();
    });
  });
});
