import styled from 'styled-components';

export const InitSettingStyled = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  background-color: ${p => p.theme.colors.innerBg};

  .form-wrap {
    width: 38rem;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }

  .form-card {
    border-radius: 8px;
    padding: 3rem;
    background-color: ${p => p.theme.colors.contentBG};
    box-shadow: 0 8px 16px rgba(160, 160, 160, 0.2);

    font-size: 3.4rem;
    font-weight: 500;

    .btn-wrap {
      margin-top: 3rem;
    }
  }

  .sub-title {
    font-size: ${p => p.theme.sizes.textLarge};
    color: ${p => p.theme.colors.textColor1};
    font-weight: bold;
    margin-bottom: 2.4rem;
  }
`;
