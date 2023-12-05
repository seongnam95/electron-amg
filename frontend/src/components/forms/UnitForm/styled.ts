import styled from 'styled-components';

export const UnitFormStyled = styled.div`
  .form-list {
    height: 30rem;
    overflow-y: auto;
    padding: 1.4rem;
    border: 1px solid ${p => p.theme.colors.borderColor};
    border-radius: 8px;

    .item-wrap {
      padding: 1rem 1.2rem;
      background-color: ${p => p.theme.colors.innerBg};
      border-radius: 0.6rem;

      :not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }

    .ant-form-item {
      margin-bottom: 0;

      .ant-input {
        background-color: white;
      }

      .ant-input-number-input {
        background-color: white;

        input {
          border: none;
        }
      }
    }
  }
`;
