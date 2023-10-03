import styled from "styled-components";
import { InputHTMLAttributes, useState } from "react";
import { SelectorStyled } from "./styled";
import { BottomSheetModal, Input } from "@com/common";

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
      <Icon className="down-arrow-icon" icon="downArrow" />
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

const ListItem = styled.ul<{ active?: boolean }>`
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: var(--font-size-l);
  height: 5.6rem;
  padding: 0 1.2rem;
  font-weight: ${(p) => (p.active ? "bold" : "normal")};
  cursor: pointer;
`;

export default Selector;
