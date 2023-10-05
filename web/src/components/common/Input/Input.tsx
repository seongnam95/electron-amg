import { ChangeEvent, InputHTMLAttributes, RefObject } from "react";
import { InputStyled } from "./styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onlyNum?: boolean;
  hint?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onCompleted?: (value: string | number) => void;
}

function Input({
  onlyNum,
  value,
  hint,
  maxLength,
  placeholder,
  inputRef,
  onCompleted,
  onChange,
  ...rest
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(e);
    if (maxLength && value.length >= maxLength) onCompleted?.(value);
  };

  return (
    <InputStyled doseExist={Boolean(value?.toString())}>
      <div className="placeholder-space" />
      <div className="input-wrap">
        <input
          onInput={(e) => {
            const { value, maxLength } = e.currentTarget;

            if (onlyNum) {
              e.currentTarget.value = value.replace(/\D/g, "");
            }

            if (maxLength !== -1 && value.length > maxLength)
              e.currentTarget.value = value.slice(0, maxLength);
          }}
          ref={inputRef}
          maxLength={maxLength}
          onChange={handleChange}
          autoComplete="off"
          value={value}
          {...rest}
        />
        <span className="placeholder-text">{placeholder}</span>
        <span className="border-bar" />
      </div>

      {hint ? <p className="hint-text">{hint}</p> : null}
    </InputStyled>
  );
}

export default Input;
