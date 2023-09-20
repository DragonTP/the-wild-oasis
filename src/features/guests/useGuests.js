import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getGuests } from "../../services/apiGuests"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE_GUESTS } from "../../utils/constants";

export const useGuests = (all = false) => {
  const queryClient = useQueryClient();
  // PAGINATION
  const [searchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;

  const { isLoading, data: { data: guests, count } = {} } = useQuery({
    queryKey: ['guests', page],
    queryFn: () => getGuests({ page, all }),
  })

  const pageCount = Math.ceil(count / PAGE_SIZE_GUESTS);
  // PRE-FETCHING
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['guests', page + 1],
      queryFn: () => getGuests({ page: page + 1, all })
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['guests', page - 1],
      queryFn: () => getGuests({ page: page - 1, all })
    })

  return { isLoading, guests, count }
}