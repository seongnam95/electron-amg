import { useState } from 'react';

import { Form, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import VirtualEmployeeCreateForm from '~/components/forms/VirtualEmployeeCreateForm';
import { teamStore } from '~/stores/team';
import { EmployeeCreateBody } from '~/types/employee';

import { useEmployeeCreate } from '../queryHooks/useEmployeeQuery';
import { useSoundApp } from './useSoundApp';

interface VirtualEmployeeFormData {
  name: string;
  period: [Dayjs, Dayjs];
  positionId: string;
  preset: number;
}

// Virtual
const useCreateVirtualEmployeeDrawer = () => {
  const team = useRecoilValue(teamStore);
  const [open, setOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<VirtualEmployeeFormData>();

  const [form] = Form.useForm<VirtualEmployeeFormData>();
  const { soundMessage } = useSoundApp();
  const { mutate, isLoading } = useEmployeeCreate({ teamId: team.id });

  const openDrawer = () => {
    form.resetFields();
    setOpen(true);
  };

  const closeDrawer = () => setOpen(false);

  const handleSubmit = (formData: VirtualEmployeeFormData) => {
    const body: EmployeeCreateBody = {
      name: formData.name,
      startPeriod: formData.period[0].format('YYYY-MM-DD'),
      endPeriod: formData.period[1].format('YYYY-MM-DD'),
      positionId: formData.positionId,
      preset: formData.preset,
      salaryCode: 3,
      signBase64: '',
      ssn: '',
      phone: '',
      bank: '',
      bankBook: '',
      bankNum: '',
      idCard: '',
      isVirtual: true,
    };

    mutate(body, {
      onSuccess: () => {
        soundMessage.success('정상 생성되었습니다.');
        closeDrawer();
      },
      onError: () => {
        soundMessage.error('잠시후 다시 시도해주세요.');
      },
    });
  };

  const initValues: VirtualEmployeeFormData = {
    name: '',
    period: [dayjs(), dayjs().endOf('month')],
    positionId: team.positions && team.positions.length > 0 ? team.positions[0].id : '',
    preset: 1,
  };

  const renderDrawer = (
    <Modal
      open={open}
      onCancel={closeDrawer}
      rootClassName="ant-drawer-inline"
      title="가상 근무자 생성"
      style={{ maxWidth: '42rem' }}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
      getContainer={() => {
        return document.getElementById('layout') || document.body;
      }}
    >
      <VirtualEmployeeCreateForm form={form} initValues={initValues} onSubmit={handleSubmit} />
    </Modal>
  );

  return { renderDrawer, openDrawer, closeDrawer };
};

export default useCreateVirtualEmployeeDrawer;
