import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  // FILTER
  const numDays = +searchParams.get('last') || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: recentStays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  })
  const confirmedStays = recentStays?.filter(stay => stay.status !== 'unconfirmed');

  return { isLoading, recentStays, confirmedStays }
}