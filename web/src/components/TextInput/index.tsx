import styled from "styled-components";

export const TextInput = styled.input`
  border: 1px solid var(--border-color);
  border-radius: 0.3rem;
  outline: none;
  padding: 0.2rem 1.4rem 0 1.4rem;
  height: 5.2rem;
  background-color: white;

  color: var(--text);
  font-size: var(--font-size-s);

  transition: var(--ease-in-out-1);

  &:focus {
    border-color: var(--primary);
  }
`;
