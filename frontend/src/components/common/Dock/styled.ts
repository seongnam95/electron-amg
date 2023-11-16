import styled from 'styled-components';

export const DockStyled = styled.div`
  .dock-wrap {
    position: absolute;
    left: 50%;
    bottom: 4rem;
    transform: translateX(-50%);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(6px);
    box-shadow: rgba(66, 66, 66, 0.1) 0 8px 36px;

    font-size: 1.4rem;
    padding: 1rem 1.8rem;

    border-radius: 0.8rem;
  }

  .excel-btn {
    :hover {
      color: #1f7342 !important;
      background-color: rgb(31, 115, 66, 0.1) !important;
    }
  }
`;
