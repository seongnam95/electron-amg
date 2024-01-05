import { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';

import { Button, Drawer, Flex, Form, Skeleton } from 'antd';
import { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import DraftForm from '~/components/forms/DraftForm';
import { teamStore } from '~/stores/team';
import { DraftCreateBody } from '~/types/draft';

import { useDraftCreateMutation } from '../queryHooks/useDraftQuery';

const useDraft = () => {
  const team = useRecoilValue(teamStore);
  const [open, setOpen] = useState<boolean>(false);

  const { createDraftMutate, isCreateDraftLoading } = useDraftCreateMutation({ teamId: team.id });

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleSubmit = (values: { position: string; period: [Dayjs, Dayjs] }) => {
    const createBody: DraftCreateBody = {
      positionId: values.position,
      startPeriod: values.period[0].format('YYYY-MM-DD'),
      endPeriod: values.period[1].format('YYYY-MM-DD'),
    };

    createDraftMutate(createBody, {
      onSuccess: () => closeDrawer(),
    });
  };

  const RenderExtra = team.existTeam ? (
    <Button type="text" icon={<BsClockHistory size="1.8rem" />} />
  ) : (
    <Skeleton.Button active size="small" />
  );

  const RenderTitle = team.existTeam ? (
    <Flex align="center" gap={10}>
      <span
        style={{
          width: '0.7rem',
          height: '1.5rem',
          borderRadius: '0.2rem',
          backgroundColor: team?.color,
        }}
      />
      {team?.name}
    </Flex>
  ) : (
    <Skeleton.Input active size="small" />
  );

  const renderDrawer = (
    <Drawer
      open={open}
      closable={false}
      onClose={closeDrawer}
      rootClassName="ant-drawer-inline"
      getContainer={() => {
        return document.getElementById('layout') || document.body;
      }}
    >
      <DraftForm positions={team.positions} onSubmit={v => console.log(v)} />
    </Drawer>
  );

  return { openDrawer, closeDrawer, renderDrawer };
};

export default useDraft;
