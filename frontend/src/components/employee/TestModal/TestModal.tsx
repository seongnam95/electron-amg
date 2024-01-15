import { useEffect, useState } from 'react';

import { Input, Modal } from 'antd';

export const useTestModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => console.log(value), [value]);

  const openModal = () => setOpen(true);

  const renderModal = <TestModal open={open} onChange={setValue} />;

  return { openModal, renderModal };
};

export interface TestModalProps {
  open: boolean;
  onChange?: (value: string) => void;
}

const TestModal = ({ open, onChange }: TestModalProps) => {
  return (
    <Modal open={open}>
      <Input onChange={e => onChange?.(e.target.value)} />
    </Modal>
  );
};

export default TestModal;
