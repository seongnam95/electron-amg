import { Modal } from 'antd';
import styled from 'styled-components';

export const GroupEditorModalStyled = styled(Modal)`
  max-width: 40rem;

  .title-color-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.4rem;

    > input {
      font-weight: bold;
      font-size: 2.2rem;

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

  .selector-row {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 0.4rem;

    .user-selector {
      width: 100%;

      .ant-select-selector {
        font-size: ${p => p.theme.sizes.textSmall};
      }
    }

    .user-clear-btn {
      > i {
        color: ${p => p.theme.colors.error};
      }

      :hover {
        > i {
          color: ${p => p.theme.colors.error};
        }
      }
    }
  }

  .btn-wrap {
    display: flex;
    gap: 0.4rem;
    justify-content: end;

    .btn-cancel {
      color: ${p => p.theme.colors.textColor2};
    }
  }
`;
