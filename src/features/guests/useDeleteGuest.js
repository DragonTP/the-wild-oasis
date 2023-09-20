import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: () => {
      toast.success('Guest has been deleted!');
      queryClient.invalidateQueries({
        queryKey: ['guests']
      })
    },
    onError: () => toast.error('You need to delete booking before deleting guest')
  })
  return { isDeleting, deleteGuest }
}