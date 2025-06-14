import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiAxiosInstance, type HttpError } from '../../../api/config';

export interface IGetTestListResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  isActive: boolean;
}

export const useGetTestList = () => {
  return useQuery<IGetTestListResponse[], HttpError>({
    queryFn: () =>
      apiAxiosInstance.get<IGetTestListResponse[]>(`/test-list`).then(({ data }) => data),
    queryKey: ['test-list'],
  });
};

export const useInvalidateTestList = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['test-list'] });
};
