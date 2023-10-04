import styled from "styled-components";

export const BankSelectorStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const BankListStyled = styled.div`
  display: flex;
  align-content: flex-start;
  height: calc(100% - 40px);
  flex-wrap: wrap;
  gap: 1rem 1.2rem;
  padding-bottom: 10rem;
  overflow-y: scroll;
  overflow-x: hidden;

  .bank-item {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 31%;
    height: 9rem;
    padding: 1.4rem 0 1rem;
    border-radius: 1.2rem;
    background-color: rgb(250, 250, 250);
    outline: none;
    border: none;
    overflow: hidden;

    color: ${(p) => p.theme.colors.textColor1};
    font-size: ${(p) => p.theme.sizes.textSmall};
    white-space: nowrap;
  }
`;
