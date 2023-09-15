import { ChangeEvent, InputHTMLAttributes, RefObject } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hint?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onCompleted?: (value: string | number) => void;
}

export const Input = ({
  hint,
  maxLength,
  placeholder,
  inputRef,
  onCompleted,
  onChange,
  ...rest
}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (maxLength && value.length >= maxLength) onCompleted?.(value);
    onChange?.(e);
  };

  return (
    <InputStyled>
      <div className="input-wrap">
        <input
          onInput={(e) => {
            const { value, maxLength } = e.currentTarget;
            if (maxLength !== -1 && value.length > maxLength)
              e.currentTarget.value = value.slice(0, maxLength);
          }}
          ref={inputRef}
          maxLength={maxLength}
          onChange={handleChange}
          autoComplete="off"
          required
          {...rest}
        />
        <span className="placeholder-text">{placeholder}</span>
        <span className="border-bar" />
      </div>

      {hint ? <p className="hint-text">{hint}</p> : null}
    </InputStyled>
  );
};

export const InputStyled = styled.label`
  padding-top: 2.8rem;

  .input-wrap {
    position: relative;

    input {
      z-index: 5;
      background: none;

      width: 100%;

      color: var(--text);
      font-size: var(--font-size-2xl);

      outline: none;
      border: none;
      border-bottom: solid 1px var(--border-color);
      border-radius: 0;

      padding-bottom: 0.8rem;
      padding-left: 0.4rem;

      :valid ~ .placeholder-text {
        font-size: var(--font-size-s);
        bottom: calc(100% + 1rem);
        color: var(--text-sub);
      }

      :focus ~ .border-bar {
        width: 100%;
      }
    }

    .border-bar {
      position: absolute;
      bottom: 0;
      left: 0;

      display: block;
      background-color: #333333;
      width: 0;
      height: 2px;

      border-radius: 2px;
      transition: 0.5s;
      z-index: 6;
    }

    .placeholder-text {
      position: absolute;
      color: var(--text-hint);
      left: 0;
      font-size: var(--font-size-2xl);
      bottom: 1rem;
      left: 0.4rem;
      transition: all 0.2s;
    }
  }

  .hint-text {
    color: var(--text-hint);
    font-size: var(--font-size-2xs);
    margin: 1.2rem 0 0 0.6rem;
  }
`;
