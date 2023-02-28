//@libs
import axios from '../../axios';
import { useQuery } from 'react-query';

const useFetchOne = (queryKey = '', id = '', config = {}) => {
  const getById = async id => {
    try {
      const instance = axios;

      const { data } = await instance.get(`/${queryKey}/${id}`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return useQuery([queryKey, id], () => getById(id), {
    ...config,
  });
};
export default useFetchOne;
