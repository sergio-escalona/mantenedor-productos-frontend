//@libs
import { useQuery } from 'react-query';
//@services
import Api from '../../../services/api';

const path = 'products';

export const useGetAllProducts = ({
  customConfig = {},
  filters = {},
  selectMode = false,
}) => {
  const path_ = selectMode ? `${path}/all` : path;
  return useQuery([path_, filters], Api.getAll, {
    refetchOnMount: true,
    ...customConfig,
  });
};
export default useGetAllProducts;
