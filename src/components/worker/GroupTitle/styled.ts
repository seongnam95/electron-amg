import styled from 'styled-components';

interface GroupTitleStyledProps {
  doesExist?: boolean;
}

export const GroupTitleStyled = styled.div<GroupTitleStyledProps>`
  display: flex;
  align-items: baseline;
  gap: 2rem;
  padding: 1.8rem;
  cursor: ${p => (p.doesExist ? 'pointer' : 'default')};

  .header-text {
    display: flex;
    gap: 1.6rem;
    align-items: center;

    font-weight: bold;
    font-size: 2.2rem;

    .info-icon {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      padding-top: 1px;

      background-color: #e6e6e6;
      color: ${p => p.theme.colors.textColor3};
      font-size: 10px;
      font-weight: bold;
    }
  }

  .manager-text-chip {
    position: absolute;
    right: 2rem;
    color: ${p => p.theme.colors.textColor2};
    background-color: ${p => p.theme.colors.innerBg};
    border-radius: 3px;
    padding: 0.7rem 1.2rem 0.5rem;
    font-weight: normal;
    font-size: ${p => p.theme.sizes.textSmall};

    .manager-name {
      font-weight: bold;
    }
  }
`;
