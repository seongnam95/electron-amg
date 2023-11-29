import { useEffect, useState } from 'react';

import { Button, Flex, Space, Steps } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import Card from '~/components/common/Card';
import PositionForm from '~/components/forms/PositionForm';
import TeamForm from '~/components/forms/TeamForm';
import { InitPageStyled } from '~/styles/pageStyled/initPageStyled';

const InitPage = () => {
  const [step, setStep] = useState<number>(0);

  const handlePrevClick = () => {
    if (step !== 0) setStep(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (steps.length - 1 !== step) setStep(prev => prev + 1);
  };

  const steps = [
    {
      key: 'team',
      title: '팀 추가',
      subTitle: '팀 정보',
      component: <TeamForm submitBtnText="다음" onSubmit={handleNextClick} />,
    },
    {
      key: 'position',
      title: '직위',
      subTitle: '직위 추가하기',
      component: (
        <PositionForm
          submitBtnText="다음"
          subBtn={
            <Button type="text" onClick={handlePrevClick}>
              이전
            </Button>
          }
          onSubmit={handleNextClick}
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
        <motion.div key={step} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="form-card" title={steps[step].subTitle}>
            {steps[step].component}
          </Card>
        </motion.div>
      </Space>
    </InitPageStyled>
  );
};

export default InitPage;
