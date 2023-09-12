import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Check({ label, ...rest }: CheckBoxProps) {
  return (
    <StyledCheckBox>
      <input type="checkbox" {...rest} />
      <div className="checkbox-wrap">
        <div className="checkbox-inner" />
      </div>
      <span className="checkbox-label">
        <span className="required-text">[ 필수 ]</span>
        {label}
      </span>
    </StyledCheckBox>
  );
}

const StyledCheckBox = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 0;

  & > input {
    display: none;
  }

  & > input[type="checkbox"]:checked + .checkbox-wrap > .checkbox-inner {
    background-color: var(--secondary);
  }

  .checkbox-wrap {
    height: 2rem;
    width: 2rem;
    padding: 0.4rem;

    border: 1px solid var(--border-color);
    border-radius: 0.3rem;

    .checkbox-inner {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;

      transition: background-color var(--ease-in-out-1);
    }
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: var(--font-size-s);
    color: var(--text);
    padding-top: 0.2rem;
    user-select: none;

    .required-text {
      color: var(--text-sub);
      font-size: var(--font-size-xs);
    }
  }
`;
