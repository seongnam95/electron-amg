import { ReactNode, useState } from 'react';

import { Steps, FormInstance } from 'antd';

import TeamForm from '~/components/forms/TeamForm';

import PositionFields from './PositionFields';
import { InitSettingStyled } from './styled';

export interface InitSettingProps {
  hasTeam?: boolean;
  children?: ReactNode;
}

const InitSetting = ({ hasTeam, children }: InitSettingProps) => {
  const [step, setStep] = useState<number>(0);

  const handlePrevClick = () => setStep(prev => prev - 1);
  const handleNextClick = () => {
    setStep(prev => prev + 1);
  };

  const steps = [
    {
      key: 'team',
      title: '업체',
      subTitle: '업체 추가하기',
      component: <TeamForm />,
    },
    {
      key: 'position',
      title: '직위',
      subTitle: '직위 추가하기',
      component: <PositionFields />,
    },
  ];

  const isLastStep = steps.length - 1 === step;
  const items = steps.map(step => ({ key: step.key, title: step.title }));
  return hasTeam ? (
    <>{children}</>
  ) : (
    <InitSettingStyled>
      <Steps
        size="small"
        current={step}
        items={items}
        style={{ width: '34rem', padding: '0 2rem' }}
      />
      <div className="form-card">
        <p className="sub-title">{steps[step].subTitle}</p>
        {steps[step].component}
      </div>
    </InitSettingStyled>
  );
};

export default InitSetting;
