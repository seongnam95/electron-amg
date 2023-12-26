import { HTMLAttributes } from 'react';

import styled from 'styled-components';

interface ColorBarProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  width?: string;
  height?: string;
}

const ColorBar = styled.span<ColorBarProps>`
  border-radius: 0.2rem;
  transition: opacity 120ms ease-in-out;
  width: ${p => (p.width ? p.width : '0.8rem')};
  height: ${p => (p.height ? p.height : '1.8rem')};
  background-color: ${p => (p.color ? p.color : p.theme.colors.primary)};
`;

export default ColorBar;
