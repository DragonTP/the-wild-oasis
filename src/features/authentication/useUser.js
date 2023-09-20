import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"

export const useUser = () => {
  const { isLoading, data: user, status } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })
  return { isLoading, status, user, isAuthenticated: user?.role === 'authenticated' }
}