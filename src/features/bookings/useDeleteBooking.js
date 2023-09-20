import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"
import { toast } from "react-hot-toast"

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking has been deleted');
      queryClient.invalidateQueries({ queryKey: ['bookings'], type: 'active' });
    },
    onError: () => toast.error('There was an error while deleting booking')
  })
  return { isDeletingBooking, deleteBooking }
}