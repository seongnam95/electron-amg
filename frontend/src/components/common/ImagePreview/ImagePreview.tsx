import {
  AiOutlineDownload,
  AiOutlineRotateLeft,
  AiOutlineRotateRight,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from 'react-icons/ai';

import { Image, ImageProps } from 'antd';

export interface ImagePreviewProps extends ImageProps {
  src?: string;
  open?: boolean;
  onClose?: () => void;
}

const ImagePreview = ({ src, open, onClose }: ImagePreviewProps) => {
  const onDownload = (src?: string) => {
    if (!src) return;

    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
    <Image
      preview={{
        toolbarRender: (_, { actions: { onRotateLeft, onRotateRight, onZoomOut, onZoomIn } }) => (
          <div className="toolbar-wrapper">
            <AiOutlineDownload size={28} onClick={() => onDownload(src)} />
            <AiOutlineRotateLeft size={28} onClick={onRotateLeft} />
            <AiOutlineRotateRight size={28} onClick={onRotateRight} />
            <AiOutlineZoomIn size={28} onClick={onZoomIn} />
            <AiOutlineZoomOut size={28} onClick={onZoomOut} />
          </div>
        ),
        visible: open,
        src: src,
        onVisibleChange: onClose,
      }}
    />
  );
};

export default ImagePreview;
