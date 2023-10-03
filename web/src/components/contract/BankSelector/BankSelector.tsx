import { InputHTMLAttributes, useState } from "react";
import { banks } from "./banks";
import { BankListStyled, BankSelectorStyled } from "./styled";
import { BottomSheetModal, Input } from "@com/common";
import BankIcon from "./BankIcon";

interface BankSelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  onSelected?: () => void;
}

function BankSelector({ onSelected, onChange, ...rest }: BankSelectorProps) {
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
      <Input readOnly onFocus={() => setShowBankModal(true)} {...rest} />

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
}

export default BankSelector;
