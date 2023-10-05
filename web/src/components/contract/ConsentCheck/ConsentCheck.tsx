import { ReactNode, useState, ChangeEvent, InputHTMLAttributes } from "react";
import { ConsentCheckStyled } from "./styled";
import { BottomSheetModal } from "@com/common";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";

interface ConsentCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  contentComponent?: ReactNode;
  contentTitle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ConsentCheck = ({
  label,
  contentComponent,
  contentTitle,
  ...rest
}: ConsentCheckProps) => {
  const [showContentModal, setShowContentModal] = useState<boolean>(false);

  return (
    <ConsentCheckStyled>
      <input type="checkbox" {...rest} />

      <div className="check-box-wrap">
        <div className="check-box">
          <AiOutlineCheck icon="check" />
        </div>
        <span className="btn-text">{label}</span>
      </div>

      <button className="more-btn" onClick={() => setShowContentModal(true)}>
        <FaAngleDown className="down-arrow-icon" />
      </button>

      <BottomSheetModal
        open={showContentModal}
        title={contentTitle}
        onClose={() => setShowContentModal(false)}
      >
        {contentComponent}
      </BottomSheetModal>
    </ConsentCheckStyled>
  );
};

export default ConsentCheck;
