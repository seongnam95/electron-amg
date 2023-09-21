import { Button } from "@components";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";

interface SignatureViewProps {
  onClose: () => void;
  onSubmit: (data: string) => void;
}

export function SignatureView({ onClose, onSubmit }: SignatureViewProps) {
  const signCanvas = useRef() as React.MutableRefObject<any>;
  const [hasSignature, setHasSignature] = useState(false);

  const saveSignature = () => {
    if (signCanvas.current) {
      const data = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      onSubmit(data);
      onClose();
    }
  };

  const onEnd = () => {
    if (signCanvas.current) {
      const isEmpty = signCanvas.current.isEmpty();
      setHasSignature(!isEmpty);
    }
  };

  return (
    <StyledSignatureView>
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
    </StyledSignatureView>
  );
}

// styled
const StyledSignatureView = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding: 3.4rem 2rem 0;
  height: 100%;

  .content-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    height: 100%;

    .header-text {
      font-size: var(--font-size-m);
      color: var(--text);
      line-height: 120%;
    }

    .signature-canvas {
      width: 100%;
      height: 60%;

      border: 1px solid var(--border-color);
      background-color: var(--inner-color);
      border-radius: 0.4rem;
    }
  }
`;
