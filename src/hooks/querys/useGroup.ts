import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { createGroup, fetchGroups, removeGroup, updateGroup } from '~/api/group';
import { GroupData } from '~/types/group';

interface QueryProps {
  onSuccess?: (groups: GroupData[]) => void;
}

export const useGroupQuery = ({ onSuccess }: QueryProps) => {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery<GroupData[], AxiosError>(['group'], fetchGroups, {
    onSuccess: onSuccess,
  });

  return { groups, isLoading, isError };
};

export const useGroupRemove = ({ onSuccess }: QueryProps) => {
  const queryClient = useQueryClient();
  const { mutate: removeMutate } = useMutation(removeGroup, {
    onSuccess: () => queryClient.invalidateQueries(),
  });
  return { removeMutate };
};
