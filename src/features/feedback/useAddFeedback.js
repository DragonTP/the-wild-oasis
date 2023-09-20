import { useMutation } from "@tanstack/react-query";
import { addFeedback as addFeedbackApi } from "../../services/apiFeedback";
import toast from "react-hot-toast";

export const useAddFeedback = () => {
  const { isLoading: isAdding, mutate: addFeedback } = useMutation({
    mutationFn: addFeedbackApi,
    onError: () => toast.error('Something wrong! Try again')
  })
  return { isAdding, addFeedback }
}