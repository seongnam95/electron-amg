import { forwardRef } from 'react';
import { BiChild, BiSolidCrown } from 'react-icons/bi';

import { Flex, Tag } from 'antd';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { PositionCreateBody, SALARY } from '~/types/position';

interface PositionItemProps {
  className: string;
  position: PositionCreateBody;
  onDoubleClick?: (position: PositionCreateBody) => void;
}

const PositionItem = forwardRef<HTMLLIElement, PositionItemProps>(
  ({ className, position, onDoubleClick, ...dragHandleProps }, itemRef) => {
    const { name, color, salaryCode, standardPay, isLeader, defaultEarnsIncentive } = position;

    return (
      <motion.li
        ref={itemRef}
        key={position.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        {...dragHandleProps}
      >
        <PositionItemStyled className={className} onDoubleClick={() => onDoubleClick?.(position)}>
          <Flex align="center">
            <Tag color={color} className="position-tag">
              {name}
            </Tag>
            {defaultEarnsIncentive ? (
              <Flex className="child-tag">
                <BiChild color="#767676" />
              </Flex>
            ) : null}
            {isLeader ? (
              <Flex className="child-tag">
                <BiSolidCrown size={9} color="#f15151" />
              </Flex>
            ) : null}
          </Flex>

          <Flex align="center">
            <Flex gap={8}>
              <span className="pay-text">{standardPay ? standardPay.toLocaleString() : 0}원</span>
              <Tag>{salaryCode ? SALARY[salaryCode] : '빈 값'}</Tag>
            </Flex>
          </Flex>
        </PositionItemStyled>
      </motion.li>
    );
  },
);

const PositionItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.4rem 0.8rem 1.2rem 1.4rem;
  background-color: ${p => p.theme.colors.innerBg};
  border-radius: 8px;

  transition: all 140ms ease-in-out;

  .position-tag {
    display: flex;
    justify-content: center;
    width: 7rem;
  }

  .pay-text {
    font-size: ${p => p.theme.sizes.textMedium};
    color: ${p => p.theme.colors.textColor1};
  }

  .child-tag {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #e7e7e7;
    border-radius: 50%;
    padding: 2px 1px 1px;
    width: 1.7rem;
    height: 1.7rem;
  }
`;

export default PositionItem;
