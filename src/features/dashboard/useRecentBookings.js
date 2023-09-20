import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  // FILTER
  const numDays = +searchParams.get('last') || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {isLoading, data: recentBookings} = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate)
  })
  return {isLoading, recentBookings, numDays}
}