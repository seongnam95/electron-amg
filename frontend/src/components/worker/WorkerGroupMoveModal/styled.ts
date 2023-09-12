import { Modal } from 'antd';
import styled from 'styled-components';

export const WorkerGroupMoveModalStyled = styled(Modal)`
  max-width: 34rem;

  .ant-modal-body {
    .group-list {
      overflow-y: scroll;
      height: 16rem;
      padding: 0.8rem 1.4rem;
      border: 1px solid ${p => p.theme.colors.borderColor};
      border-radius: 4px;
    }
  }

  .footer-wrap {
    display: flex;
    justify-content: end;

    .btn-wrap {
      display: flex;
    }

    .err-msg {
      display: flex;
      align-items: center;
      color: ${p => p.theme.colors.error};
      font-size: ${p => p.theme.sizes.textSmall};
    }
  }
`;
