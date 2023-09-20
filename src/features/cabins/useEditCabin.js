import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({newCabin, id}) => createEditCabin(newCabin, id),
    onSuccess() {
      toast.success('Cabin have been successfully edited!');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError(err) {
      toast.error(err.message);
    }
  });

  return {editCabin, isEditing}
}