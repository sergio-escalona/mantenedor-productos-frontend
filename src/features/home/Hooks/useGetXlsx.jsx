//@libs
import { useMutation } from 'react-query';

//@services
import Api from '../../../services/api';

const path = 'dashboard/xlsx';

const useGetXlsx = filters =>
  useMutation(() => Api.generateFileToDownload({ path, filters }), {
    onSuccess: () => {},
    onError: () => {
      console.log('Error');
    },
  });

export default useGetXlsx;
