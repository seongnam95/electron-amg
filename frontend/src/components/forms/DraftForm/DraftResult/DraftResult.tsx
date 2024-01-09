import { ReactNode } from 'react';

import { Descriptions, Result, Tag } from 'antd';
import clsx from 'clsx';

import DescriptionsBox from '~/components/common/DescriptionsBox';
import Info from '~/components/common/Info';
import { useCopyText } from '~/hooks/depository/useCopyText';
import { colors } from '~/styles/themes';
import { DraftData } from '~/types/draft';
import { SALARY } from '~/types/employee';

import { DraftResultStyled } from './styled';

export interface DraftResultProps {
  draft?: DraftData;
}

const DraftResult = ({ draft }: DraftResultProps) => {
  const { copyText } = useCopyText();

  const handleClick = () => {
    if (draft) {
      copyText(`http://amgcom.site/draft/${draft.id}`);
    }
  };

  return (
    <DraftResultStyled>
      {draft ? (
        <>
          <Result status="success" title="정상 처리되었습니다." />
          <DescriptionsBox fontWeight="normal">
            <Descriptions
              column={1}
              colon={false}
              contentStyle={{ display: 'inline-block', textAlign: 'right' }}
            >
              <Descriptions.Item label={<Info title="테그 클릭 시 주소 복사">계약서 ID</Info>}>
                <Tag
                  color={colors.primary}
                  style={{ margin: 0, cursor: 'pointer' }}
                  onClick={handleClick}
                >
                  {draft.id}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="직위">{draft.position.name}</Descriptions.Item>
              <Descriptions.Item label="급여 형태">
                <Tag>{SALARY[draft.salaryCode]}</Tag>
                {draft.position.standardPay.toLocaleString()}원
              </Descriptions.Item>
              <Descriptions.Item label="계약 기간">
                {draft.startPeriod} ~ {draft.endPeriod}
              </Descriptions.Item>
            </Descriptions>
          </DescriptionsBox>
        </>
      ) : (
        <Result
          status="error"
          title="계약서 생성에 실패했습니다."
          subTitle="잠시후 다시 시도해주세요."
        />
      )}
    </DraftResultStyled>
  );
};

export default DraftResult;
