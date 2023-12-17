import styled from 'styled-components';

export const DockStyled = styled.div`
  .dock-wrap {
    position: absolute;
    right: 2.4rem;
    bottom: 2.4rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(32px);
    box-shadow: rgba(66, 66, 66, 0.2) 0 8px 36px;

    font-size: 1.4rem;
    padding: 1.4rem;

    border-radius: 0.8rem;
    z-index: 1000;
  }

  .excel-btn {
    :hover {
      color: #1f7342 !important;
      background-color: rgb(31, 115, 66, 0.1) !important;
    }
  }
`;
