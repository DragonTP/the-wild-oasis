import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAvatar as deleteAvatarApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteAvatar } = useMutation({
    mutationFn: deleteAvatarApi,
    onSuccess: () => {
      toast.success('Your avatar has been deleted!');
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: err => toast.error(err.message)
  })
  return { isDeleting, deleteAvatar }
}