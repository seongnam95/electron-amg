import styled from "styled-components";

export const FormHistoryViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.4rem;

  font-size: var(--font-size-m);
  color: var(--text);

  .draft-item {
    cursor: pointer;

    section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.4rem;
      margin-top: 1.2rem;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .group-name-text {
      font-weight: bold;
      font-size: var(--font-size-2xl);
    }

    .id-chip {
      color: var(--text-sub);
      border-radius: 4px;
      padding: 0.4rem 0.8rem;
      background-color: var(--inner-color);
    }

    .wage {
      font-weight: bold;
      color: var(--blue);
    }
  }
`;
