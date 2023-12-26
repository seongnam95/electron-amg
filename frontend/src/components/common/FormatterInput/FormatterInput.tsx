import { ChangeEvent, useEffect, useState } from 'react';

import { Input, InputProps } from 'antd';

export interface FormatterInputProps extends InputProps {
  onlyNum?: boolean;
  inputType?: 'default' | 'phone' | 'ssn' | 'money';
}

const FormatterInput = ({
  onlyNum,
  inputType = 'default',
  value: parentValue,
  ...props
}: FormatterInputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (parentValue !== undefined) {
      // 부모 컴포넌트에서 전달된 value를 포맷팅하여 설정
      const formattedValue = formatValue(parentValue.toString());
      setValue(formattedValue);
    }
  }, [parentValue]);

  const formatValue = (val: string) => {
    if (onlyNum || ['phone', 'ssn', 'money'].includes(inputType)) {
      val = val.replace(/\D/g, ''); // 숫자만 허용
    }

    switch (inputType) {
      case 'ssn':
        val = val.slice(0, 13); // 최대 13자리까지만 허용
        return val.length > 6 ? `${val.substring(0, 6)} ${val.substring(6)}` : val;
      case 'phone':
        val = val.slice(0, 11); // 최대 11자리까지만 허용 ('010' 포함)
        return val.replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, (_, p1, p2, p3) => {
          if (p3) return `${p1} ${p2} ${p3}`;
          if (p2) return `${p1} ${p2}`;
          return p1;
        });
      case 'money':
        return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      default:
        return val;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatValue(event.target.value);
    setValue(formattedValue);

    let newValue = formattedValue;
    if (onlyNum || !['default'].includes(inputType)) newValue = formattedValue.replace(/\D/g, '');

    const newEvent: ChangeEvent<HTMLInputElement> = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    };
    props.onChange?.(newEvent);
  };

  return <Input {...props} value={value} onChange={handleChange} />;
};

export default FormatterInput;
