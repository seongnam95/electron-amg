import { Button } from "@components";
import React, { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (signCanvas.current) {
      signCanvas.current.getCanvas().width =
        signCanvas.current.getCanvas().offsetWidth;
      signCanvas.current.getCanvas().height =
        signCanvas.current.getCanvas().offsetWidth;
    }
  }, []);

  return (
    <StyledSignatureView>
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
      <Button onClick={saveSignature} type="button" disabled={!hasSignature}>
        서명하기
      </Button>
    </StyledSignatureView>
  );
}

// styled
const StyledSignatureView = styled.div`
  position: relative;
  background-color: white;

  padding: 3.4rem 2rem 12rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .header-text {
    font-size: var(--font-size-m);
    color: var(--text);
    line-height: 120%;
  }

  .signature-canvas {
    border: 1px solid var(--border-color);
    background-color: var(--inner-color);
  }
`;
