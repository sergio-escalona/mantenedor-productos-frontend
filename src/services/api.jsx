// import { saveAs } from 'file-saver';
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

// export const generateFileToDownload = async (
//   queryKey: { path: string; filters: any; },
//   type: ExportTypeFile
// ) => {
//   const { path, filters } = queryKey;
//   const instance = axios;

//   const response = await instance.post(
//     `/${path}`,
//     { ...filters, type },
//     {
//       responseType: 'arraybuffer',
//     }
//   );
//   console.log(type);

//   const contentDisposition = response.headers['content-disposition'];

//   const fileName = contentDisposition
//     ?.split(';')[1]
//     .split('filename')[1]
//     .split('=')[1]
//     .trim();

//   if (type === 'xlsx' || type === 'EXCEL') {
//     console.log(' it s exce');
//     const XLSXblob = new Blob([response.data], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });

//     saveAs(XLSXblob, fileName);
//   } else {
//     console.log(' it s pf');
//     const PDFblob = new Blob([response.data], {
//       type: 'application/pdf',
//     });
//     console.log(' it sdasdas');

//     saveAs(PDFblob, fileName);
//   }
//   return response.data;
// };

const ApiService = {
  getAll,
  getById,
  create,
  update,
  remove,
  //   generateFileToDownload,
};
export default ApiService;
