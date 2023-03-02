//@libs
import { useQuery } from 'react-query';
//@services
import Api from '../../../services/api';

const path = 'dashboard';

export const useGetAllGraphs = ({
  customConfig = {},
  filters = {},
  selectMode = false,
}) => {
  const path_ = `${path}/graphs`;
  return useQuery([path_, filters], Api.getAll, {
    refetchOnMount: true,
    ...customConfig,
  });
};
export default useGetAllGraphs;
