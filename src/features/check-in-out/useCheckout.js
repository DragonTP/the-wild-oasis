import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import { toast } from "react-hot-toast"

import emailjs from "@emailjs/browser"
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from "../../utils/constants"
import { format } from "date-fns"
import { formatCurrency } from "../../utils/helpers"

export const sendEmail = data => {
  // const data = {
  //   cabinId: 69,
  //   cabinPrice: 300,
  //   cabins: {
  //     discount: 0,
  //     name: 'long',
  //     regularPrice: 300
  //   },
  //   created_at:
  //     "2023-09-19T08:01:46.745431+00:00",
  //   endDate: "2023-09-20T08:01:05.688",
  //   extrasPrice: 132,
  //   guests: {
  //     email: 'rimapa1479@vip4e.com',
  //     fullName: 'Phi Long',
  //     nationalID: '23232322323',
  //     nationality: 'Viet Nam'
  //   },
  //   id: 118,
  //   numGuests: 33,
  //   numNights: 1,
  //   startDate: "2023-09-19T08:01:05.688",
  //   totalPrice: 432,
  // }
  const { discount, name: cabinName, regularPrice } = data.cabins;
  const { fullName, email, nationality, nationalID } = data.guests;
  const newData = {
    ...data,
    cabinName,
    fullName,
    email,
    nationality,
    nationalID,
    created_at: format(new Date(data.created_at), 'MMM dd yyyy'),
    startDate: format(new Date(data.startDate), 'MMM dd yyyy'),
    endDate: format(new Date(data.endDate), 'MMM dd yyyy'),
    discount: formatCurrency(discount),
    regularPrice: formatCurrency(regularPrice),
    cabinPrice: formatCurrency(regularPrice * data.numNights),
    breakfastPrice: formatCurrency(data.extrasPrice / data.numNights / data.numGuests),
    totalDiscount: formatCurrency(discount * data.numNights),
    totalPrice: formatCurrency(data.totalPrice)
  };
  emailjs.send(SERVICE_ID, TEMPLATE_ID, newData, PUBLIC_KEY)
    .then(function (response) {
      toast.success(`Mail has been sent! ${response.status}`);
    }, function (error) {
      console.log('FAILED TO SEND MAIL...', error);
    });
}

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingout, mutate: checkout } = useMutation({
    mutationFn: bookingId => updateBooking(bookingId, {
      status: 'checked-out'
    }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} has been successfully checked out`);
      queryClient.invalidateQueries({ type: 'active' });
    },
    onError: err => toast.error(err.message0)
  })
  return { isCheckingout, checkout }
}