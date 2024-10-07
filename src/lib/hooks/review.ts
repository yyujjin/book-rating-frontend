import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchReview } from "../actions/review";

export const useReview = () => {
  const queryClient = useQueryClient();
  const updateReview = useMutation({
    mutationFn: patchReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  return { updateReview };
};
