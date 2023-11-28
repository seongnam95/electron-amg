import { darken } from 'polished';
import styled from 'styled-components';

export const PositionListStyled = styled.div`
  position: relative;

  .position-list {
    height: 15rem;
    overflow-y: auto;
  }

  .empty-wrap {
    position: absolute;
    left: calc(50% - 8px);
    top: calc(50% + 6px);
    transform: translate(-50%, -50%);
  }
`;
