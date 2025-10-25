import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  type Request,
  addRequestToCollection,
  saveRequest,
  getallRequestFromCollection,
} from "../actions";
import { useRequestPlaygroundStore } from "../store/useRequestStore";

export function useAddRequestToCollection(collectionId: string) {
  const { updateTabFromSavedRequest, activeTabId } =
    useRequestPlaygroundStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) =>
      addRequestToCollection(collectionId, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateTabFromSavedRequest(activeTabId, data);
    },
  });
}

export function useGetallRequestFromCollection(collectionId: string) {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getallRequestFromCollection(collectionId),
  });
}

export function useSaveRequest(id: string) {
  const { updateTabFromSavedRequest, activeTabId } =
    useRequestPlaygroundStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateTabFromSavedRequest(activeTabId, data);
    },
  });
}
