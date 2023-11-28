import { ReactNode, useEffect, useState } from 'react';

import { Flex, Steps, Form, Button, FormInstance } from 'antd';

import PositionFields from './PositionFields';
import TeamFields from './TeamFields';
import { InitSettingStyled } from './styled';

export interface InitSettingProps {
  hasTeam?: boolean;
  children?: ReactNode;
}

const steps = [
  {
    key: 'team',
    title: '업체',
    subTitle: '업체 추가하기',
    renderComponent: (form: FormInstance) => <TeamFields {...{ form }} />,
  },
  {
    key: 'position',
    title: '직위',
    subTitle: '직위 추가하기',
    renderComponent: (form: FormInstance) => <PositionFields />,
  },
];

const InitSetting = ({ hasTeam, children }: InitSettingProps) => {
  const [step, setStep] = useState<number>(0);
  const [form] = Form.useForm();

  const isLastStep = steps.length - 1 === step;

  const handlePrevClick = () => setStep(prev => prev - 1);
  const handleNextClick = () => {
    if (isLastStep) form.submit();
    else {
      form.validateFields(['name', 'mealCost', 'teamColor']).then(() => setStep(prev => prev + 1));
    }
  };

  const handleFinish = () => {
    const values = form.getFieldsValue(['name', 'mealCost', 'teamColor']);
  };

  const items = steps.map(step => ({ key: step.key, title: step.title }));

  return hasTeam ? (
    <>{children}</>
  ) : (
    <InitSettingStyled>
      <Flex className="form-wrap" vertical gap={24}>
        <Steps size="small" current={step} items={items} style={{ padding: '0 2rem' }} />

        <div className="form-card">
          <p className="sub-title">{steps[step].subTitle}</p>

          {steps[step].renderComponent(form)}

          <Flex className="btn-wrap" align="center" justify="end" gap={12}>
            {step > 0 ? (
              <Button type="text" onClick={handlePrevClick}>
                이전
              </Button>
            ) : null}
            <Button type="primary" onClick={handleNextClick}>
              {isLastStep ? '완료' : '다음'}
            </Button>
          </Flex>
        </div>
      </Flex>
    </InitSettingStyled>
  );
};

export default InitSetting;
