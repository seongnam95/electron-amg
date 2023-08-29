import { Modal } from 'antd';
import styled from 'styled-components';

export const GroupEditorModalStyled = styled(Modal)`
  max-width: 42rem;

  .title-color-row {
    display: flex;
    gap: 2.2rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    > .input-name {
      flex: 1;
      font-size: 2rem;

      outline: none;
      border: none;
      border-bottom: 2px solid ${p => p.theme.colors.primary};

      padding: 0 0.4rem;
      background-color: transparent;
      overflow: hidden;
    }
  }

  .input-explanation {
    flex: 1;
    width: 100%;

    outline: none;
    border: none;
    border-radius: 4px;
    background-color: ${p => p.theme.colors.innerBg};

    padding: 0.4rem 0.8rem;
    font-size: ${p => p.theme.sizes.textSmall};
  }

  .user-selector {
    width: 100%;
    margin-top: 1rem;

    .ant-select-selector {
      font-size: ${p => p.theme.sizes.textSmall};
    }
  }

  .footer-wrap {
    display: flex;
    justify-content: space-between;

    .btn-remove {
      color: ${p => p.theme.colors.error};
    }

    .btn-cancel {
      color: ${p => p.theme.colors.textColor2};
    }

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
