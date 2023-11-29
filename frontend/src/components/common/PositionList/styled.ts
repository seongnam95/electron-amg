import { darken } from 'polished';
import styled from 'styled-components';

export const PositionListStyled = styled.div`
  position: relative;
  width: 34rem;
  min-height: 30rem;
  height: 100%;
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius: 8px;
  padding: 2rem;

  .position-list {
    height: 100%;
    overflow-y: auto;

    li {
      :not(:last-child) {
        margin-bottom: 0.6rem;
      }
    }
  }

  .empty-wrap {
    position: absolute;
    left: calc(50% - 8px);
    top: calc(50% + 6px);
    transform: translate(-50%, -50%);
  }
`;
