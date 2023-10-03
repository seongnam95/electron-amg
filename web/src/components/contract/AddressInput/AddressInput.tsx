import { InputHTMLAttributes, useRef, useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import { AddressInputStyled } from "./styled";
import { BottomSheetModal, Input } from "@com/common";

interface AddressInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSelected?: () => void;
}

function AddressInput({ onSelected, onChange, ...rest }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);

  const handleOnComplete = (address: Address) => {
    if (onChange) {
      onChange({
        target: {
          value: address.address,
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onSelected?.();
    setShowAddressModal(false);
  };

  return (
    <AddressInputStyled>
      <Input
        readOnly
        inputRef={inputRef}
        onFocus={() => setShowAddressModal(true)}
        {...rest}
      />

      <BottomSheetModal
        title="주소 검색"
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
      >
        <DaumPostcode
          animation
          style={{ height: "100%" }}
          onComplete={handleOnComplete}
        />
      </BottomSheetModal>
    </AddressInputStyled>
  );
}

export default AddressInput;
