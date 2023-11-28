import { useState } from 'react';

import { Flex } from 'antd';

import { ColorItem } from './styled';

const defaultColors = ['#4C53FF', '#875DFF', '#5AC9F9', '#FC9434', '#FF5959'];

export interface ColorSelectorProps {
  colors?: string[];
  onChange?: (hexColor: string) => void;
}

const ColorSelector = ({ colors = defaultColors, onChange }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

  const handleChange = (color: string) => {
    setSelectedColor(color);
    onChange?.(color);
  };

  return (
    <Flex gap={10} wrap="wrap">
      {colors.map((color, idx) => {
        const isChecked = selectedColor === color;
        return (
          <ColorItem key={idx} color={color}>
            <input type="radio" checked={isChecked} onChange={() => handleChange(color)} />
            <div className="color-box" />
          </ColorItem>
        );
      })}
    </Flex>
  );
};

export default ColorSelector;
