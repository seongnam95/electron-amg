import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { SignatureStyled } from "./styled";
import { Button } from "@com/common";

interface SignatureProps {
  onComplete: (data: string) => void;
}

function Signature({ onComplete }: SignatureProps) {
  const signCanvas = useRef() as React.MutableRefObject<any>;
  const [hasSignature, setHasSignature] = useState(false);

  const saveSignature = () => {
    if (signCanvas.current) {
      const data = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      onComplete(data);
    }
  };

  const onEnd = () => {
    if (signCanvas.current) {
      const isEmpty = signCanvas.current.isEmpty();
      setHasSignature(!isEmpty);
    }
  };

  return (
    <SignatureStyled>
      <div className="content-wrap">
        <p className="header-text">
          계약 조항을 주의 깊게 읽고 이해하였으며, <br />
          모든 조항에 동의할 경우 아래에 서명해주세요.
        </p>

        <SignatureCanvas
          velocityFilterWeight={0}
          onEnd={onEnd}
          ref={signCanvas}
          canvasProps={{ className: "signature-canvas" }}
        />
      </div>

      <Button onClick={saveSignature} type="button" disabled={!hasSignature}>
        서명하기
      </Button>
    </SignatureStyled>
  );
}

export default Signature;
