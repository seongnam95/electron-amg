import clsx from 'clsx';

import { ChipStyled, ChipStyledProps } from './styled';

const palettes = {
  primary: {
    $color: '#FFFFFF',
    $bgColor: '#4070F4',
    $borderColor: 'transparent',
  },
  warning: {
    $color: '#FFFFFF',
    $bgColor: '#f44040',
    $borderColor: 'transparent',
  },
};

type VariationType = keyof typeof palettes;

interface ChipProps extends ChipStyledProps {
  $palette?: VariationType;
}

const Chip = ({ className, children, $palette, $size = 'small', ...rest }: ChipProps) => {
  const defaultColors = $palette && palettes[$palette];

  return (
    <ChipStyled className={clsx('Chip', className)} $size={$size} {...defaultColors} {...rest}>
      {children}
    </ChipStyled>
  );
};

export default Chip;
