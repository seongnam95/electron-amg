import { useState } from 'react';

import { Drawer, DrawerProps, Form, Input, Button, Space, Select } from 'antd';

import { TeamData } from '~/types/team';

import TeamSelector from '../TeamSelector';
import { DraftCreateDrawerStyled } from './styled';

export interface DraftCreateDrawerProps extends DrawerProps {
  teams: Array<TeamData>;
  selectedTeamID?: string;
}

const DraftCreateDrawer = ({
  teams,
  selectedTeamID,
  onClose,
  ...props
}: DraftCreateDrawerProps) => {
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);
  const [defaultUnitPay, setDefaultUnitPay] = useState<number>(0);

  const selectedTeam = teams.find(team => team.id == selectedTeamID);

  const handleShowDraftDrawer = () => setOpenHistoryDrawer(true);
  const handleCloseDraftDrawer = () => setOpenHistoryDrawer(false);
  const handleFinish = (v: any) => console.log(v);
  const handleChangePosition = (positionID: string) => {
    const pay = selectedTeam?.positions.find(pos => pos.id == positionID)?.unitPay;
    setDefaultUnitPay(pay ?? 0);
  };

  const positionOptions = selectedTeam
    ? selectedTeam.positions.map(pos => {
        return {
          value: pos.id,
          label: pos.name,
        };
      })
    : [];

  const RenderExtra = (
    <>
      <Button onClick={handleShowDraftDrawer}>이전 기록</Button>
    </>
  );

  return (
    <DraftCreateDrawerStyled
      className="DraftCreateDrawer"
      closable={false}
      onClose={onClose}
      extra={RenderExtra}
      {...props}
    >
      <TeamSelector teams={teams} selectedTeamID={selectedTeamID} />

      <Form
        name="trigger"
        layout="vertical"
        autoComplete="off"
        style={{ marginTop: '2.4rem' }}
        onFinish={handleFinish}
        initialValues={{
          position: '1',
          unitPay: defaultUnitPay,
        }}
      >
        <Form.Item hasFeedback label="직위 구분" name="position">
          <Select defaultValue="팀장" onChange={handleChangePosition} options={positionOptions} />
        </Form.Item>

        <Form.Item hasFeedback label="단가" name="unitPay" validateFirst>
          <Input placeholder="단가" type="number" defaultValue={defaultUnitPay.toLocaleString()} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          생성하기
        </Button>
      </Form>

      {/* 히스토리 Drawer */}
      <Drawer closable={false} open={openHistoryDrawer} onClose={handleCloseDraftDrawer}>
        두번째
      </Drawer>
    </DraftCreateDrawerStyled>
  );
};

export default DraftCreateDrawer;
