import { AiFillCheckCircle, AiOutlineClose, AiOutlinePaperClip } from 'react-icons/ai';

import { Button, Descriptions, Flex } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import { DraftData } from '~/types/draft';

import { DraftResultBoxStyled } from './styled';

interface DraftResultBoxProps {
  show?: boolean;
  draft?: DraftData;
  onCopy?: (id: string) => void;
  onClose?: () => void;
}

const DraftResultBox = ({ show, draft, onCopy, onClose }: DraftResultBoxProps) => {
  const isShow = show === true && draft !== undefined;

  if (!isShow) return null;
  return (
    <motion.div
      key={draft.id}
      className="result-wrap"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <DraftResultBoxStyled>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={8}>
            <AiFillCheckCircle size={16} color="#52c41a" />
            <span>폼 생성 완료!</span>
          </Flex>

          <Flex align="center">
            <Button size="small" type="link" onClick={() => onCopy?.(draft.id)}>
              <Flex align="center" gap="0.5rem">
                <AiOutlinePaperClip size="1.6rem" />
                링크복사
              </Flex>
            </Button>
            <Button size="small" type="text" style={{ paddingTop: '2px' }} onClick={onClose}>
              <AiOutlineClose size="1.4rem" />
            </Button>
          </Flex>
        </Flex>

        <Descriptions
          column={1}
          colon={false}
          contentStyle={{
            display: 'inline-block',
            textAlign: 'right',
          }}
        >
          <Descriptions.Item label="직위">{draft.position.name}</Descriptions.Item>
          <Descriptions.Item label="페이">
            {draft.position.pay.toLocaleString()}원
          </Descriptions.Item>
          <Descriptions.Item label="계약일">
            {draft.startPeriod} ~ {draft.endPeriod}
          </Descriptions.Item>
        </Descriptions>
      </DraftResultBoxStyled>
    </motion.div>
  );
};

export default DraftResultBox;
