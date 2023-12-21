import styled from 'styled-components';

export const AttendanceBarStyled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 0.4rem;
  z-index: 2;
  pointer-events: none;

  cursor: pointer;

  .attendance-bar {
    flex: 1;
    height: 1.8rem;

    border-radius: 4px;

    transition: all 140ms ease-in-out;
    opacity: 0.8;
  }
`;
