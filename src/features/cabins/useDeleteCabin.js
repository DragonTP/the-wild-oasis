import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, status: deleteStatus } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess() {
      toast.success('Cabin successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError(err) {
      toast.error(err.message);
    }
  })

  return { deleteCabin, deleteStatus }
}