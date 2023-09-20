import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast"

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success('New booking has been created!');
      queryClient.invalidateQueries({ active: true })
    },
    onError: err => err.toast('Something wrong! Try again!')
  })
  return { isCreating, createBooking }
}