import { Header } from "@components";
import styled from "styled-components";
import { useMemo, useRef, useState } from "react";
import { DraftContractView, FormHistoryView } from "@views";
import { Tabs } from "antd";

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
        key: "create",
        label: "계약서 폼 생성",
        children: <DraftContractView onCopy={handleOnCopy} />,
      },
      {
        key: "history",
        label: "이전 기록",
        children: <FormHistoryView onCopy={handleOnCopy} />,
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
      <Tabs className="tabs" items={tabs} />
      <input readOnly ref={inputRef} className="link-text" />
    </StyledAdminPage>
  );
}

const StyledAdminPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3.4rem 2rem 5.6rem;

  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .tabs {
    height: calc(100% - 5.6rem);
  }

  .ant-tabs-content-holder {
    overflow-y: scroll;
  }

  .link-text {
    position: absolute;
    top: -100%;
  }
`;
