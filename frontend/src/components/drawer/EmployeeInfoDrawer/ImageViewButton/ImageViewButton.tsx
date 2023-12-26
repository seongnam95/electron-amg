import { ReactNode, useState } from 'react';

import ImagePreview from '~/components/common/ImagePreview';

import { ImageViewButtonStyled } from './styled';

interface ImageViewButtonProps {
  label: string;
  icon: ReactNode;
  src?: string;
}

const ImageViewButton = ({ icon, label, src }: ImageViewButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ImageViewButtonStyled>
      <button disabled={!src} className="img-btn" onClick={() => setOpen(true)}>
        {icon}
        {label}
      </button>
      <ImagePreview src={src} open={open} onClose={() => setOpen(false)} />
    </ImageViewButtonStyled>
  );
};

export default ImageViewButton;
