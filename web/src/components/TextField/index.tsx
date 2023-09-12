import styled from "styled-components";
import { TextInput } from "@components";
import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string | number;
  onlyNum?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  label,
  value,
  onlyNum,
  onChange,
  ...rest
}: TextFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      onChange?.(e);
    }
  };

  return (
    <StyledTextField>
      <span className="field-label">{label}</span>
      <TextInput
        value={value}
        onChange={onlyNum ? handleChange : onChange}
        {...rest}
      />
    </StyledTextField>
  );
}

const StyledTextField = styled.label`
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
