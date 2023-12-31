import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettingApi} from "../../services/apiSettings"
import { toast } from "react-hot-toast"

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  const {isLoading: isUpdating, mutate: updateSetting} = useMutation({
    mutationKey: ['settings'],
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings have been successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['settings']
      })
    },
    onError: err => toast.error(err.message)
  })
  
  return {isUpdating, updateSetting}
}