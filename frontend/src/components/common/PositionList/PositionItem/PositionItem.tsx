import { BiChild } from 'react-icons/bi';
import { IoMdRemoveCircle } from 'react-icons/io';

import { Flex, Tag } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { PositionCreateBody, SALARY } from '~/types/position';

interface PositionItemProps {
  className: string;
  position: PositionCreateBody;
  onDoubleClick?: (position: PositionCreateBody) => void;
}

const PositionItem = ({ className, position, onDoubleClick }: PositionItemProps) => {
  const { name, color, salaryCode, standardPay, isChild } = position;

  return (
    <AnimatePresence>
      <motion.li
        key={position.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <PositionItemStyled className={className} onDoubleClick={() => onDoubleClick?.(position)}>
          <Flex align="center">
            <Tag color={color} className="position-tag">
              {name}
            </Tag>
            {isChild ? (
              <Flex className="child-tag">
                <BiChild size={14} color="#767676" />
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
    </AnimatePresence>
  );
};

const PositionItemStyled = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.4rem 0.8rem 1.2rem 1.4rem;
  background-color: ${p => p.theme.colors.innerBg};
  border-radius: 8px;

  opacity: ${p => (p.selected ? 0.8 : 1)};
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
    background-color: #e7e7e7;
    border-radius: 50%;
    padding: 2px 1px 1px;
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
