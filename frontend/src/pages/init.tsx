import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Space, Steps } from 'antd';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Card from '~/components/common/Card';
import PositionForm from '~/components/forms/PositionForm';
import TeamForm from '~/components/forms/TeamForm';
import UnitForm from '~/components/forms/UnitForm';
import { initUnits } from '~/components/forms/UnitForm/formConfig';
import { usePositionCreateMutation } from '~/hooks/queryHooks/usePositionQuery';
import { useTeamCreateMutation } from '~/hooks/queryHooks/useTeamQuery';
import { userStore } from '~/stores/user';
import { InitPageStyled } from '~/styles/pageStyled/initPageStyled';
import { PositionCreateBody } from '~/types/position';
import { TeamCreateBody } from '~/types/team';
import { UnitCreateBody, UnitData } from '~/types/unit';

interface FormData {
  team: TeamCreateBody;
  positions: PositionCreateBody[];
}

const defaultValues: FormData = {
  team: {
    name: '',
    color: '#4C53FF',
    mealCost: 7000,
    otPay: 15000,
    units: initUnits,
  },
  positions: [],
};

const InitPage = () => {
  const { id } = useRecoilValue(userStore);
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(defaultValues);
  const [units, setUnits] = useState<UnitData[]>([]);

  const navigate = useNavigate();

  const { createTeamMutate, isCreateTeamLoading } = useTeamCreateMutation({
    userId: id,
    onSuccess: team => setUnits(team.units),
  });

  const { createPositionMutate, isCreatePositionLoading } = usePositionCreateMutation({
    userId: id,
  });

  const handlePrevClick = () => {
    if (step !== 0) setStep(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (steps.length - 1 !== step) setStep(prev => prev + 1);
  };

  // TeamForm 서브밋 핸들러
  const handleTeamFormSubmit = (team: TeamCreateBody) => {
    setFormData(prev => {
      return {
        team: {
          ...team,
          units: prev.team.units,
        },
        positions: prev.positions,
      };
    });
    handleNextClick();
  };

  // UnitForm 체인지 핸들러
  const handleUnitFormChange = (units: UnitCreateBody[]) => {
    setFormData(prev => {
      return {
        team: {
          ...prev.team,
          units: units,
        },
        positions: prev.positions,
      };
    });
  };

  // PositionForm 체인지 핸들러
  const handlePositionFormChange = (positions: PositionCreateBody[]) => {
    setFormData(prev => {
      return {
        ...prev,
        positions: positions,
      };
    });
  };

  // 팀 생성 서브밋
  const createTeamSubmit = () =>
    createTeamMutate(formData.team, {
      onSuccess: handleNextClick,
      onError: err => {
        console.log('err', err);
      },
    });

  // 직위 생성 서브밋
  const createPositionSubmit = () => {
    createPositionMutate(formData.positions, {
      onSuccess: () => navigate('/management/dashboard'),
      onError: err => {
        console.log('err', err);
      },
    });
  };

  const steps = [
    {
      key: 'team',
      title: '팀 추가',
      subTitle: '팀 정보',
      component: (
        <TeamForm values={formData.team} submitBtnText="다음" onSubmit={handleTeamFormSubmit} />
      ),
    },
    {
      key: 'unit',
      title: '단가 설정',
      subTitle: '대행사 단가 설정',
      component: (
        <UnitForm
          values={formData.team.units}
          submitBtnText="팀 생성하기"
          cancelBtnText="이전"
          isLoading={isCreateTeamLoading}
          onCancel={handlePrevClick}
          onChange={handleUnitFormChange}
          onSubmit={createTeamSubmit}
        />
      ),
    },
    {
      key: 'position',
      title: '직위',
      subTitle: '직위 추가하기',
      component: (
        <PositionForm
          values={formData.positions}
          unitValues={units}
          submitBtnText="직위 생성"
          isLoading={isCreatePositionLoading}
          onChange={handlePositionFormChange}
          onSubmit={createPositionSubmit}
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
          initial={{ opacity: 0, x: -140 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 140 }}
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
