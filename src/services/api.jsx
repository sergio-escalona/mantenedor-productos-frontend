//@libs
import { saveAs } from 'file-saver';
import queryString from 'query-string';
import axios from '../axios';
import formatQuery from '../utils/query';

const getAll = async ({ queryKey }) => {
  let filters = '';
  const instance = axios;
  if (queryKey[1]) {
    const querys = Object.entries(queryKey[1]);

    const queryObj = {};
    querys.forEach(([key, value], i) => {
      queryObj[key] = value;
    });
    if (queryObj?.enabled) delete queryObj?.enabled;

    filters = queryString.stringify(formatQuery(queryObj));
  }
  try {
    const { data } = await instance.get(`${queryKey[0]}?${filters}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getById = async queryKey => {
  const [path, id] = queryKey;
  const instance = axios;

  try {
    const { data } = await instance.get(`/${path}/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const create = async queryKey => {
  const [path, body] = queryKey;
  try {
    const instance = axios;
    const { data } = await instance.post(`/${path}`, body);
    return data;
  } catch (e) {
    return Promise.reject(e.response.data);
  }
};

const update = async queryKey => {
  const [path, _id, body] = queryKey;
  const instance = axios;

  try {
    const { data } = await instance.put(`/${path}/${_id}`, body);
    return data;
  } catch (e) {
    return Promise.reject(e.response.data);
  }
};

const remove = async queryKey => {
  const [path, _id] = queryKey;
  const instance = axios;

  try {
    await instance.delete(`/${path}/${_id}`);
    return _id;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const generateFileToDownload = async queryKey => {
  const { path, filters } = queryKey;
  const instance = axios;

  const response = await instance.post(
    `/${path}`,
    { ...filters },
    {
      responseType: 'arraybuffer',
    }
  );

  const fileName = 'productos';

  const XLSXblob = new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(XLSXblob, fileName);

  return response.data;
};

const ApiService = {
  getAll,
  getById,
  create,
  update,
  remove,
  generateFileToDownload,
};
export default ApiService;
