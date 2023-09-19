import styled from "styled-components";
import { BankIcon, BottomSheetModal, Input } from "@components";
import { InputHTMLAttributes, useRef, useState } from "react";
import { banks } from "./banks";

interface BankSelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  onSelected?: () => void;
}

export const BankSelector = ({
  onSelected,
  onChange,
  ...rest
}: BankSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);

  const handleBankSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({
        target: {
          value: selectedValue,
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onSelected?.();
    setShowBankModal(false);
  };

  return (
    <BankSelectorStyled>
      <Input
        readOnly
        inputRef={inputRef}
        onFocus={() => setShowBankModal(true)}
        {...rest}
      />

      <BottomSheetModal
        title="은행 선택"
        open={showBankModal}
        onClose={() => setShowBankModal(false)}
      >
        <BankListStyled>
          {banks.map((bank) => (
            <button
              key={bank.icon}
              className="bank-item"
              onClick={() => handleBankSelect(bank.name)}
            >
              <BankIcon bank={bank.icon} />
              {bank.name}
            </button>
          ))}
        </BankListStyled>
      </BottomSheetModal>
    </BankSelectorStyled>
  );
};

const BankSelectorStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BankListStyled = styled.div`
  display: flex;
  align-content: flex-start;
  height: calc(100% - 40px);
  flex-wrap: wrap;
  gap: 1rem 1.2rem;
  padding-bottom: 10rem;
  overflow-y: scroll;
  overflow-x: hidden;

  .bank-item {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 31%;
    height: 9rem;
    padding: 1.4rem 0 1rem;
    border-radius: 1.2rem;
    background-color: rgb(250, 250, 250);
    outline: none;
    border: none;
    overflow: hidden;

    color: var(--text);
    font-size: var(--font-size-s);
    white-space: nowrap;
  }
`;
