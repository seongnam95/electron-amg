import { ReactNode, useEffect, useRef, useState } from 'react';

import { Button } from 'antd';
import clsx from 'clsx';

import { TextInputStyled } from './styled';

export interface TextInputProps {
  className?: string;
}

const TextInput = ({ className }: TextInputProps) => {
  const [value, setValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  return (
    <TextInputStyled
      className={clsx('TextInput', className)}
      onDoubleClick={() => setIsEditing(prev => !prev)}
    >
      {isEditing ? (
        <div className="input-wrap">
          <input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} />
        </div>
      ) : (
        <span>{value}</span>
      )}
    </TextInputStyled>
  );
};

export default TextInput;
