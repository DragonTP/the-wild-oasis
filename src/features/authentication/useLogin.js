import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: user => {
      navigate('/dashboard');
      queryClient.setQueryData(['user'], user.user);
    },
    onError: () => toast.error('Provided email or password are incorrect!')
  })

  return { isLoading, login }
}