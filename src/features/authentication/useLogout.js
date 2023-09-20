import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { logout as logoutApi } from "../../services/apiAuth"
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate('/login');
      queryClient.removeQueries();
    },
    onError: err => toast.error(err)
  })
  return { isLoading, logout }
}