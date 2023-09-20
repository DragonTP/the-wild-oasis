import { useQuery } from "@tanstack/react-query"
import { getIdFeedbacks } from "../../services/apiFeedback"

export const useGetIdFeedbacks = () => {
  const { isLoading, data: feedbacks } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: getIdFeedbacks,
  })
  return { isLoading, feedbacks }
}