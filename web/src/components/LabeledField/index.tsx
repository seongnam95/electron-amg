import styled from "styled-components";

interface LabeledFieldProps {
  label?: string;
  children?: React.ReactNode;
}

export function LabeledField({ label, children }: LabeledFieldProps) {
  return (
    <StyledLabeledField>
      <p className="field-label">{label}</p>
      {children}
    </StyledLabeledField>
  );
}

const StyledLabeledField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .field-label {
    font-size: var(--font-size-xs);
    font-weight: bold;
    color: var(--text);
    padding-left: 0.4rem;
  }
`;
