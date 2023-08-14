import styled from 'styled-components';

export const EditableLabelStyled = styled.div<{ isEditing?: boolean }>`
  padding: 2rem;

  > .row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > input {
      font-weight: bold;
      font-size: 2.2rem;

      outline: none;
      border: none;
      border-bottom: 2px solid ${p => (p.isEditing ? p.theme.colors.primary : 'transparent')};

      padding: 0.4rem 0.4rem;
      background-color: transparent;
      overflow: hidden;

      :disabled {
        background-color: transparent;
      }
    }

    .btn-wrap {
      display: flex;

      i {
        font-size: 2.4rem;
      }

      .ok-btn {
        i {
          color: #19d115;
        }
      }

      .cancel-btn {
        i {
          color: #de5050;
        }
      }
    }
  }

  > .edit-row {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 2rem;

    .input-explanation {
      flex: 1;
      max-width: 40rem;

      outline: none;
      border: 1px solid ${p => p.theme.colors.borderColor};
      border-radius: 4px;

      padding: 0.4rem 0.8rem;
      font-size: ${p => p.theme.sizes.textSmall};
    }
  }
`;
