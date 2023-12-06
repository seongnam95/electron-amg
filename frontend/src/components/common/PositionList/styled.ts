import styled from 'styled-components';

export const PositionListStyled = styled.div`
  position: relative;
  width: 34rem;
  min-height: 30rem;
  max-height: 36rem;
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius: 8px;

  .position-list {
    height: 100%;
    padding: 2rem;
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

  .position-item.editing {
    opacity: 0.5;

    &.selected {
      opacity: 1;
      scale: 1.06;
      border: 1px solid ${p => p.theme.colors.borderColor};
      box-shadow: 0 4px 14px rgba(160, 160, 160, 0.2);
    }
  }
`;
