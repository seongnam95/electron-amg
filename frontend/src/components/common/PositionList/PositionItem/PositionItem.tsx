import { BiChild } from 'react-icons/bi';
import { IoMdRemoveCircle } from 'react-icons/io';

import { Flex, Tag } from 'antd';
import styled from 'styled-components';

import { PositionUpdateBody, SALARY } from '~/types/position';

interface PositionItemProps {
  position: PositionUpdateBody;
  onDoubleClick?: (position: PositionUpdateBody) => void;
  onRemove?: (position: PositionUpdateBody) => void;
}

const PositionItem = ({ position, onDoubleClick, onRemove }: PositionItemProps) => {
  const { name, color, salaryCode, standardPay, isChild } = position;

  return (
    <PositionItemStyled onDoubleClick={() => onDoubleClick?.(position)}>
      <Flex align="center">
        <Tag color={color} className="position-tag">
          {name}
        </Tag>
        {isChild ? <BiChild size={18} color="#767676" /> : null}
      </Flex>

      <Flex align="center">
        <Flex gap={8}>
          <span className="pay-text">{standardPay ? standardPay.toLocaleString() : 0}원</span>
          <Tag>{salaryCode ? SALARY[salaryCode] : '빈 값'}</Tag>
        </Flex>

        <Flex
          align="center"
          justify="center"
          className="remove-btn-wrap"
          onClick={() => onRemove?.(position)}
        >
          <IoMdRemoveCircle color="#fe6968" />
        </Flex>
      </Flex>
    </PositionItemStyled>
  );
};

const PositionItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0.8rem 0.8rem 1.4rem;
  background-color: ${p => p.theme.colors.innerBg};
  border-radius: 8px;

  .position-tag {
    display: flex;
    justify-content: center;
    width: 7rem;
  }

  .pay-text {
    font-size: ${p => p.theme.sizes.textMedium};
    color: ${p => p.theme.colors.textColor1};
  }

  .remove-btn-wrap {
    width: 3rem;
    height: 3rem;
    cursor: pointer;

    svg {
      transition: all 140ms;
    }

    :hover {
      svg {
        transform: scale(1.1);
      }
    }
  }
`;

export default PositionItem;
