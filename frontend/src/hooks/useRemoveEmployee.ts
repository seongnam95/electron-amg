import { useEmployeeRemoveMutation } from './queryHooks/useEmployeeQuery';
import { useSoundApp } from './useSoundApp';

interface RemoveEmployeeOptions {
  teamId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const useRemoveEmployee = ({ teamId, onSuccess, onCancel }: RemoveEmployeeOptions) => {
  const { soundMessage, soundModal } = useSoundApp();
  const { removeEmployeeMutate } = useEmployeeRemoveMutation({
    teamId: teamId,
    onError: msg => soundMessage.error(msg),
    onSuccess: onSuccess,
  });

  const removeEmployee = (target: string | string[]) => {
    const ids = typeof target === 'string' ? [target] : target;
    soundModal({
      type: 'warning',
      title: '해당 근로자를 삭제하시겠습니까?',
      content: '휴지통으로 이동되며, 30일 후 완전히 삭제됩니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      centered: true,
      onOk: () => removeEmployeeMutate(ids),
      onCancel: onCancel,
    });
  };

  return { removeEmployee };
};
