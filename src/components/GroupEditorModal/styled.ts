import { Modal } from 'antd';
import styled from 'styled-components';

export const GroupEditorModalStyled = styled(Modal)`
  display: flex;
  max-width: 40rem;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    margin-top: 2.4rem;

    outline: none;
    border: none;
    border-radius: 4px;
    background-color: ${p => p.theme.colors.underBg};

    padding: 0.4rem 0.8rem;
    font-size: ${p => p.theme.sizes.textSmall};
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
