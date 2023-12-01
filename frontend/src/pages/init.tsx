import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Space, Steps } from 'antd';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Card from '~/components/common/Card';
import PositionForm from '~/components/forms/PositionForm';
import TeamForm from '~/components/forms/TeamForm';
import { useTeamCreateMutation } from '~/hooks/queryHooks/useTeamQuery';
import { userStore } from '~/stores/user';
import { InitPageStyled } from '~/styles/pageStyled/initPageStyled';
import { PositionCreateBody } from '~/types/position';
import { TeamCreateBody } from '~/types/team';

const defaultValues: TeamCreateBody = {
  name: '',
  color: '#4C53FF',
  mealCost: 7000,
  positions: [],
};

const InitPage = () => {
  const { id } = useRecoilValue(userStore);
  const [step, setStep] = useState<number>(0);
  const [prevStep, setPrevStep] = useState(0);
  const [formData, setFormData] = useState<TeamCreateBody>(defaultValues);
  const navigate = useNavigate();

  useEffect(() => setPrevStep(step), [step]);
  const { createTeamMutate, isCreateTeamLoading } = useTeamCreateMutation({ userId: id });

  const handlePrevClick = () => {
    if (step !== 0) setStep(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (steps.length - 1 !== step) setStep(prev => prev + 1);
  };

  const handleTeamFormSubmit = (team: TeamCreateBody) => {
    setFormData(prev => {
      return {
        ...team,
        positions: prev.positions,
      };
    });
    handleNextClick();
  };

  const handlePositionFormChange = (positions: PositionCreateBody[]) => {
    setFormData(prev => {
      return {
        ...prev,
        positions: positions,
      };
    });
  };

  const createTeamWithPosition = () =>
    createTeamMutate(formData, { onSuccess: () => navigate('/management/dashboard') });

  const steps = [
    {
      key: 'team',
      title: '팀 추가',
      subTitle: '팀 정보',
      component: (
        <TeamForm values={formData} submitBtnText="다음" onSubmit={handleTeamFormSubmit} />
      ),
    },
    {
      key: 'position',
      title: '직위',
      subTitle: '직위 추가하기',
      component: (
        <PositionForm
          values={formData?.positions}
          submitBtnText="완료"
          subBtn={
            <Button type="text" onClick={handlePrevClick}>
              이전
            </Button>
          }
          isBtnLoading={isCreateTeamLoading}
          onChange={handlePositionFormChange}
          onSubmit={createTeamWithPosition}
        />
      ),
    },
  ];

  const items = steps.map(step => ({ key: step.key, title: step.title }));
  return (
    <InitPageStyled>
      <Space className="container" align="center" direction="vertical" size={24}>
        <Steps
          size="small"
          current={step}
          items={items}
          style={{ width: '34rem', padding: '0 2rem' }}
        />
        <motion.div
          key={step}
          initial={{ opacity: 0, x: step > prevStep ? 140 : -140 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: step > prevStep ? -140 : 140 }}
        >
          <Card className="form-card" title={steps[step].subTitle}>
            {steps[step].component}
          </Card>
        </motion.div>
      </Space>
    </InitPageStyled>
  );
};

export default InitPage;
