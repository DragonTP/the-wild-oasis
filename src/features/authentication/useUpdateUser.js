import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser as updateUserApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['user']}),
    onError: err => toast.error(err.message)
  })
  return { isUpdating, updateUser }
}