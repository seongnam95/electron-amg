import styled from 'styled-components';

interface GroupTitleStyledProps {
  doesExist?: boolean;
}

export const GroupTitleStyled = styled.div<GroupTitleStyledProps>`
  display: flex;
  align-items: baseline;
  gap: 2rem;
  padding: 1.8rem;

  .header-text {
    font-weight: bold;
    font-size: 2.2rem;
    cursor: ${p => (p.doesExist ? 'pointer' : 'default')};
  }

  .explanation-text {
    display: flex;
    align-items: center;
    color: ${p => p.theme.colors.textColor3};
    font-size: 1.2rem;
    font-weight: normal;

    ::before {
      content: '*';
      padding: 0.5rem 0.8rem 0 0;
    }
  }

  .manager-text {
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
