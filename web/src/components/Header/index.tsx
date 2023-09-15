import styled from "styled-components";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { stepState } from "@stores";

export const Header = () => {
  const step = useRecoilValue(stepState);
  const StepHeaders = useMemo(
    () => [
      {
        title: "AMG 계약서 작성",
        subTitle: (
          <>
            계약자(수급인) 정보를 정확히 입력해주세요. <br />
            올바르지 않은 정보 입력은 <br />
            계약 진행에 불이익을 초래할 수 있습니다.
          </>
        ),
      },
      {
        title: "AMG 계약서 작성",
        subTitle: (
          <>
            계약자(수급인) 정보를 정확히 입력해주세요. <br />
            올바르지 않은 정보 입력은 <br />
            계약 진행에 불이익을 초래할 수 있습니다.
          </>
        ),
      },
      {
        title: "신분증 및 통장사본 첨부",
        subTitle: (
          <>
            계약자(수급인)의 신분증과 통장 사본을 첨부해주세요.
            <br />
            본인 명의의 통장 또는 계좌번호가 아닐 경우
            <br />
            관리자에게 문의해주세요.
          </>
        ),
      },
      {
        title: "계약 조항",
        subTitle: (
          <>
            모든 계약 조항을 꼼꼼히 읽은 후,
            <br />
            계약에 동의한다면 아래 서명란에 서명해 주세요.
          </>
        ),
      },
    ],
    []
  );
  const header = StepHeaders[step];

  return (
    <HeaderStyled>
      <motion.div
        key={step}
        className="description-box"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="description-title">{header.title}</span>
        {header.subTitle ? (
          <span className="description-content">{header.subTitle}</span>
        ) : null}
      </motion.div>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  .description-box {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 3.4rem;
    height: 9rem;

    .description-title {
      color: var(--text);
      font-size: var(--font-size-2xl);
      font-weight: bold;
    }

    .description-content {
      color: var(--text-sub);
      font-size: var(--font-size-xs);
      line-height: 150%;
    }
  }
`;
