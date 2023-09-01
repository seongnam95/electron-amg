import styled from 'styled-components';

interface GroupTitleStyledProps {
  doesExist?: boolean;
}

export const GroupTitleStyled = styled.div<GroupTitleStyledProps>`
  display: flex;
  justify-content: space-between;
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
  }

  .create-form-btn {
    color: ${p => p.theme.colors.primary};
  }
`;
