import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createGuest as createGuestApi } from "../../services/apiGuests"
import toast from "react-hot-toast"

export const useCreateGuest = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createGuest } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success('New guest has successfully been created');
      queryClient.invalidateQueries({
        queryKey: ['guests']
      })
    },
    onError: (err) => toast.error(err.message)
  })
  return { isCreating, createGuest }
}