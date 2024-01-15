import { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';

import { Button, Drawer, Flex, Form, Skeleton } from 'antd';
import { Dayjs } from 'dayjs';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import DraftForm from '~/components/forms/DraftForm';
import DraftResult from '~/components/forms/DraftForm/DraftResult';
import DraftResultBox from '~/components/forms/DraftForm/DraftResultBox/DraftResultBox';
import { teamStore } from '~/stores/team';
import { DraftCreateBody, DraftData } from '~/types/draft';

import { useDraftCreateMutation } from '../queryHooks/useDraftQuery';

const useDraft = () => {
  const team = useRecoilValue(teamStore);
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [draft, setDraft] = useState<DraftData>();
  const [page, setPage] = useState<'form' | 'result' | 'history'>('form');

  const { createDraftMutate, isCreateDraftLoading } = useDraftCreateMutation({ teamId: team.id });

  const openDrawer = () => {
    setPage('form');
    setDraft(undefined);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = (body: DraftCreateBody) => {
    createDraftMutate(body, {
      onSuccess: (draft: DraftData) => {
        setPage('result');
        setDraft(draft);
      },
    });
  };

  const RenderExtra = team.existTeam ? (
    <Button type="text" icon={<BsClockHistory size="1.8rem" />} />
  ) : (
    <Skeleton.Button active size="small" />
  );

  const renderDrawer = (
    <Drawer
      open={open}
      closable={false}
      onClose={closeDrawer}
      rootClassName="ant-drawer-inline"
      title="계약서 생성"
      extra={RenderExtra}
      getContainer={() => {
        return document.getElementById('layout') || document.body;
      }}
    >
      <motion.div key={page} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        {page === 'form' ? (
          <DraftForm
            team={team}
            loading={isCreateDraftLoading}
            form={form}
            positions={team.positions}
            onSubmit={handleSubmit}
          />
        ) : page === 'result' ? (
          <DraftResult draft={draft} />
        ) : null}
      </motion.div>
    </Drawer>
  );

  return { openDrawer, closeDrawer, renderDrawer };
};

export default useDraft;
