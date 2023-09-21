import { useState } from "react";
import styled from "styled-components";
import { Salary } from "@types";
import { LayoutGroup, motion } from "framer-motion";

interface SalaryRadioProps {
  value?: Salary;
  className?: string;
  onChange?: (value: Salary) => void;
}

interface SalaryRadioOption {
  value: Salary;
  label: string;
}

export function SalaryRadio({ value, className, onChange }: SalaryRadioProps) {
  const [selected, setSelected] = useState<Salary>(value || "daily");

  const salaryTypes: Array<SalaryRadioOption> = [
    {
      value: "daily",
      label: "일급",
    },
    {
      value: "weekly",
      label: "주급",
    },
    {
      value: "monthly",
      label: "월급",
    },
  ];

  const handleChange = (v: Salary) => {
    setSelected(v);
    onChange?.(v);
  };

  return (
    <SalaryRadioStyled className={className}>
      <LayoutGroup>
        {salaryTypes.map((salary) => {
          const isActive = selected === salary.value;
          return (
            <label className="radio-item" key={salary.value}>
              {isActive && (
                <motion.div
                  className="menuActiveBG"
                  layoutId="menuActiveBG"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                ></motion.div>
              )}
              <input
                type="radio"
                checked={isActive}
                onChange={() => handleChange(salary.value)}
              />
              <span className={"label-text" + (isActive ? " active" : "")}>
                {salary.label}
              </span>
            </label>
          );
        })}
      </LayoutGroup>
    </SalaryRadioStyled>
  );
}

const SalaryRadioStyled = styled.div`
  position: relative;
  display: flex;

  height: 4.8rem;
  width: 100%;

  border: 1px solid var(--border-color);
  border-radius: 0.5rem;

  color: var(--text);
  font-size: var(--font-size-xl);
  overflow: hidden;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  .radio-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    > input {
      display: none;
    }
  }

  .menuActiveBG {
    position: absolute;
    background-color: var(--inner-color);
    width: calc(100% / 3);
    height: 100%;
    top: 0;
  }

  .label-text {
    z-index: 2;
    color: var(--text-sub);
    transition: color 200ms;

    &.active {
      color: var(--text);
    }
  }
`;
