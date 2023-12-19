import { BsFillInfoCircleFill } from 'react-icons/bs';

import { Tooltip, TooltipProps } from 'antd';

import { colors } from '~/styles/themes';

const Info = ({ children, ...props }: TooltipProps) => {
  return (
    <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      {children}
      <Tooltip {...props}>
        <BsFillInfoCircleFill size={11} color={colors.iconColor3} />
      </Tooltip>
    </div>
  );
};

export default Info;
