import { useEffect, useRef, useState } from 'react';

import { Button, Flex, Input, PopoverProps, InputRef, Space, InputNumber } from 'antd';

import { InputPopoverStyled } from './styled';

export interface InputPopoverProps extends PopoverProps {
  inputType?: 'text' | 'number';
  placeholder?: string | number;
  onSubmit?: (value: number | string) => void;
}

const InputPopover = ({
  inputType,
  placeholder,
  children,
  onSubmit,
  ...props
}: InputPopoverProps) => {
  const numberInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<InputRef>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number | null>(null);

  // 인풋 포커스
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
        numberInputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  // Popover 닫기, value 초기화
  const closePopover = () => {
    setInputValue(null);
    setOpen(false);
  };

  // 입력 핸들러
  const handleInputChange = (value: string | number | null) => setInputValue(value);

  // 서브밋 핸들러
  const handleSubmit = () => {
    if (onSubmit && inputValue !== null) onSubmit(inputValue);
    closePopover();
  };

  // 키 입력 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') closePopover();
    else if (e.key === 'Enter') handleSubmit();
  };

  const popoverContent = (
    <Space size={14} direction="vertical" style={{ margin: '8px 4px' }}>
      {inputType === 'number' ? (
        <InputNumber
          ref={numberInputRef}
          value={inputValue}
          min={0}
          addonAfter="원"
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          placeholder={String(placeholder?.toLocaleString())}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          style={{ width: '100%' }}
        />
      ) : (
        <Input
          ref={inputRef}
          value={inputValue ?? ''}
          placeholder={String(placeholder)}
          onKeyDown={handleKeyDown}
          onChange={e => {
            const targetValue = e.target.value;
            handleInputChange(targetValue);
          }}
        />
      )}
      <Flex justify="end" gap={6}>
        <Button type="text" size="small" onClick={closePopover}>
          닫기
        </Button>
        <Button type="primary" size="small" onClick={handleSubmit}>
          변경
        </Button>
      </Flex>
    </Space>
  );

  return (
    <InputPopoverStyled
      content={popoverContent}
      open={open}
      trigger="click"
      placement="bottom"
      onOpenChange={v => setOpen(v)}
      {...props}
    >
      {children}
    </InputPopoverStyled>
  );
};

export default InputPopover;
