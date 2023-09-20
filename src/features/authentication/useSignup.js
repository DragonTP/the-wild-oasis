import { useMutation } from "@tanstack/react-query"
import { signupUser } from "../../services/apiAuth"
import toast from 'react-hot-toast';

export const useSignup = () => {
  const {isLoading: isCreating, mutate: signup} = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('New user has been created! Please verify the new account from the user\'s email address')
    },
    onError: err => toast.error(err.message)
  })
  return {isCreating, signup}
}