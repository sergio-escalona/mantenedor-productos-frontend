import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

//@services
import Api from '../../services/api';

const clientTarget = 'app';

export default function useMutateBuilder({
  queryKey,
  successCreate,
  successDelete,
  successUpdate,
}) {
  const queryClient = useQueryClient();

  const resetQueries = () => queryClient.invalidateQueries(queryKey);

  const showToastAlert = ({ type = 'success', message = '' }) => {
    toast(message, { type });
  };

  const handleCreate = useMutation(
    body => Api.create([queryKey, body, clientTarget]),
    {
      onSuccess: () => {
        showToastAlert({ message: successCreate });
        resetQueries();
      },
      onError: err =>
        showToastAlert({
          type: 'error',
          message: err.detail || 'Error al crear',
        }),
    }
  );
  const handleUpdate = useMutation(
    ({ id, body }) => Api.update([queryKey, id, body, clientTarget]),
    {
      onSuccess: () => {
        showToastAlert({ message: successUpdate });
        resetQueries();
      },
      onError: err =>
        showToastAlert({
          type: 'error',
          message: err.detail || 'No fue posible actualizar',
        }),
    }
  );
  const handleDelete = useMutation(
    id => Api.remove([queryKey, id, clientTarget]),
    {
      onSuccess: () => {
        showToastAlert({ message: successDelete });
        resetQueries();
      },
      onError: err =>
        showToastAlert({
          type: 'error',
          message: err.detail || 'No fue posible eliminar',
        }),
    }
  );
  return { handleCreate, handleUpdate, handleDelete };
}
