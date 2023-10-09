import styled from 'styled-components';

export const EmployeeSidebarStyled = styled.div`
  width: 22rem;
  height: 100%;
  border-left: 1px solid ${p => p.theme.colors.borderColor};
  background-color: rgb(250, 250, 250);
  padding: 2rem;

  .ant-progress-text {
    padding-top: 3px !important;
    color: ${p => p.theme.colors.textColor2} !important;
    font-size: ${p => p.theme.sizes.textSmall};
  }

  .card-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.2rem;
    padding: 2rem 0;
    background-color: white;
    border-radius: 1.2rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 32px;

    > p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${p => p.theme.sizes.textSmall};

      b {
        font-size: ${p => p.theme.sizes.textLazy};
      }
    }
  }
`;
