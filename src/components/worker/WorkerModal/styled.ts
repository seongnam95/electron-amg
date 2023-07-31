import styled from 'styled-components';

export const WorkerModalStyled = styled.div`
  z-index: 9999;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 3rem;
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius: 0.8rem;
  background-color: ${p => p.theme.colors.formFieldBG};

  font-size: ${p => p.theme.sizes.textMedium};
  color: ${p => p.theme.colors.textColor1};

  .ant-divider {
    margin: 2rem 0;
  }

  .text-lazy-size {
    font-size: ${p => p.theme.sizes.textLazy};
  }

  .text-bold {
    font-weight: bold;
  }

  .text-sub {
    color: ${p => p.theme.colors.textColor2};
  }

  .info-row {
    display: flex;
    align-items: center;
  }

  .worker-info-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .gender-bullet {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-left: 1rem;
    }
  }
`;
