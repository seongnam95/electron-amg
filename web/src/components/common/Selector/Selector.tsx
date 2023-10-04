import styled from "styled-components";
import { InputHTMLAttributes, useState } from "react";
import { SelectorStyled } from "./styled";
import { BottomSheetModal, Input } from "@com/common";
import { FaAngleDown } from "react-icons/fa6";

interface ItemType {
  value: string;
  label: string;
}

interface SelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  items: Array<ItemType>;
  modalTitle: string;
  onSelected?: () => void;
}

function Selector({
  items,
  modalTitle,
  onSelected,
  onChange,
  ...props
}: SelectorProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentLabel = items.find((item) => item.value === props.value)?.label;

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({
        target: {
          value: selectedValue,
          name: props.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onSelected?.();
    setShowModal(false);
  };

  return (
    <SelectorStyled>
      <Input
        readOnly
        {...props}
        value={currentLabel || ""}
        onFocus={() => setShowModal(true)}
      />
      <FaAngleDown className="down-arrow-icon" />
      <BottomSheetModal
        open={showModal}
        height="70%"
        title={modalTitle}
        onClose={() => setShowModal(false)}
      >
        <ul>
          {items.map((item) => (
            <ListItem
              key={item.value}
              active={props.value === item.value}
              onClick={() => handleSelect(item.value)}
            >
              {item.label}
            </ListItem>
          ))}
        </ul>
      </BottomSheetModal>
    </SelectorStyled>
  );
}

const ListItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colors.textColor1};
  font-size: ${(p) => p.theme.sizes.textLazy};
  height: 5rem;
  padding: 0 1.2rem;
  font-weight: ${(p) => (p.active ? "bold" : "normal")};
  cursor: pointer;
`;

export default Selector;
