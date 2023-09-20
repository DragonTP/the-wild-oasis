import { useMutation } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useCheckin = () => {
  const navigate = useNavigate();
  const { isLoading: isCheckingIn, mutate: checkin, error } = useMutation({
    mutationFn: ({ bookingId, data = {} }) => updateBooking(bookingId, {
      isPaid: true,
      status: 'checked-in',
      ...data,
    }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} has been successfully checked in`);
      navigate('/dashboard');
    },
    onError: () => toast.error('There was an error while checking in!')
  })
  return { isCheckingIn, checkin, error }
}