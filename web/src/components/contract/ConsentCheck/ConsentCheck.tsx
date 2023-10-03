import { ReactNode, useState, ChangeEvent } from "react";
import { ConsentCheckStyled } from "./styled";
import { BottomSheetModal } from "@com/common";

interface ConsentCheckProps {
  name?: string;
  checked?: boolean;
  label?: string;
  content?: ReactNode;
  contentTitle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ConsentCheck = ({
  label,
  content,
  contentTitle,
  ...rest
}: ConsentCheckProps) => {
  const [showContentModal, setShowContentModal] = useState<boolean>(false);

  const handleMoreClick = () => {
    if (content) setShowContentModal(true);
  };

  return (
    <ConsentCheckStyled>
      <input type="checkbox" {...rest} />

      <div className="check-box-wrap">
        <div className="check-box">
          <Icon icon="check" />
        </div>
        <span className="btn-text">{label}</span>
      </div>

      <button className="more-btn" onClick={handleMoreClick}>
        <Icon icon="downArrow" />
      </button>

      {content && (
        <BottomSheetModal
          open={showContentModal}
          title={contentTitle}
          onClose={() => setShowContentModal(false)}
        >
          {content}
        </BottomSheetModal>
      )}
    </ConsentCheckStyled>
  );
};

export default ConsentCheck;
