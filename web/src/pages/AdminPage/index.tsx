import { Header, TabBar } from "@components";
import styled from "styled-components";
import { useMemo, useRef } from "react";
import { DraftContractView, FormHistoryView } from "@views";

export function AdminPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnCopy = async (formId: string) => {
    if (inputRef.current) {
      inputRef.current.value = `http://amgcom.site/${formId}`;
      setClipboard();
    }
  };

  const tabs = useMemo(
    () => [
      {
        label: "계약서 폼 생성",
        view: <DraftContractView onCopy={handleOnCopy} />,
      },
      {
        label: "이전 기록",
        view: <FormHistoryView onCopy={handleOnCopy} />,
      },
    ],
    []
  );

  const setClipboard = async () => {
    try {
      const el = inputRef?.current;
      el?.select();
      document.execCommand("copy");
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      alert(`클립보드 복사에 실패했습니다. \nErr: ${err}`);
    }
  };

  return (
    <StyledAdminPage>
      <Header
        height="8rem"
        title="계약서 폼 생성"
        subTitle={<>생성 된 링크를 계약자에게 전달해주세요.</>}
      />
      <TabBar className="tab-bar-wrap" items={tabs} />
      <input readOnly ref={inputRef} className="link-text" />
    </StyledAdminPage>
  );
}

const StyledAdminPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3.4rem 2rem;

  width: 100vw;
  height: 100%;
  overflow: hidden;

  .tab-bar-wrap {
    height: calc(100% - 5.6rem);
  }

  .link-text {
    position: absolute;
    top: -100%;
  }
`;
