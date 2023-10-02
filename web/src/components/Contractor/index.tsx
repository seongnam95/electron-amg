import { ContractState, ContractorState } from "@stores";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface ContractorProps {
  printView?: boolean;
  onClickSign?: () => void;
}

export function Contractor({ printView, onClickSign }: ContractorProps) {
  const { name, phone, residence } = useRecoilValue(ContractorState);
  const { signBase64 } = useRecoilValue(ContractState);

  const ContractorContent = (
    <>
      <div className="contractor-wrap">
        <div className="field-title">
          도급인
          {printView ? (
            <>
              <br />甲
            </>
          ) : null}
        </div>

        <ul className="field-list">
          <li className="field-list-row">
            <span>사업체명</span>
            <p>에이엠지(AMG)</p>
          </li>
          <li className="field-list-row">
            <span>주 소</span>
            <p className="address-text">남양주시 미금로57번길 20, 715-2102</p>
          </li>
          <li className="field-list-row">
            <span>대 표 자</span>
            <p>
              김지호
              <span>
                (인 또는 서명)
                <img
                  className="stamp-img"
                  alt="stamp"
                  src="http://amgcom.site/static/stamp.png"
                />
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div className="contractor-wrap second" onClick={onClickSign}>
        <div className="field-title">
          수급인
          {printView ? (
            <>
              <br />乙
            </>
          ) : null}
        </div>
        <ul className="field-list">
          <li className="field-list-row">
            <span>연락처</span>
            <p>{phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</p>
          </li>
          <li className="field-list-row">
            <span>주 소</span>
            <p className="address-text">{residence}</p>
          </li>
          <li className="field-list-row">
            <span>성 명</span>
            <p>
              {name}
              <span className="contractor-sign">
                (인 또는 서명)
                {signBase64 ? (
                  <img className="stamp-img" alt="stamp" src={signBase64} />
                ) : null}
              </span>
            </p>
          </li>
        </ul>
      </div>
      {printView ? null : (
        <p className="sign-hint">* 수급인 라벨을 클릭하여 서명해주세요.</p>
      )}
    </>
  );

  if (printView) {
    return <StyledContractorPrint>{ContractorContent}</StyledContractorPrint>;
  } else {
    return <StyledContractor>{ContractorContent}</StyledContractor>;
  }
}

const StyledContractor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  font-size: var(--font-size-s);
  color: var(--text);

  .stamp-img {
    position: absolute;
    width: 5rem;
    height: 5rem;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .sign-hint {
    text-align: right;
    padding-right: 0.8rem;
    font-size: var(--font-size-xs);
    color: var(--blue);
  }

  .contractor-wrap {
    background-color: white;
    padding: 1.4rem 0;

    &.second {
      cursor: pointer;
    }

    .field-title {
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 1rem 1.2rem;
      font-size: var(--font-size-l);
    }

    .field-list {
      flex: 1;

      .field-list-row {
        display: flex;
        align-items: center;

        & > span {
          width: 7.6rem;
          font-weight: bold;
          padding: 1rem 0.8rem 0.8rem 0.8rem;
        }

        & > p {
          display: flex;
          flex: 1;
          padding: 1rem 0.8rem 0.8rem 0.8rem;
          justify-content: space-between;

          > span {
            position: relative;
            color: var(--text-hint);
          }
        }
      }
    }
  }
`;

// styled
const StyledContractorPrint = styled.div`
  display: flex;
  font-size: var(--font-size-2xs);

  @media print {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;

    .field-title {
      background-color: var(--canvas-color) !important;
    }
  }

  .stamp-img {
    position: absolute;
    width: 5rem;
    right: 1rem;
    top: -1.2rem;
  }

  .contractor-wrap {
    display: flex;
    border: 1px solid var(--text);
    width: 100%;

    :first-child {
      border-right: none;
    }

    .field-title {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 150%;
      font-weight: bold;
      border-right: 1px solid var(--text);
      padding: 0.4rem 0.6rem 0 0.6rem;
      background-color: var(--canvas-color) !important;
    }

    .field-list {
      flex: 1;

      .field-list-row {
        display: flex;
        border-bottom: 1px solid var(--text);

        .address-text {
          font-size: var(--font-size-3xs);
        }

        &:last-child {
          border-bottom: none;
        }

        & > span {
          text-align: center;
          width: 6.4rem;
          font-weight: bold;
          border-right: 1px solid var(--text);
          padding: 0.5rem 0 0.3rem 0;
        }

        & > p {
          position: relative;
          display: flex;
          flex: 1;
          padding: 0.5rem 0.4rem 0.3rem 0.8rem;
          justify-content: space-between;

          > span {
            color: var(--text-hint);
            font-size: var(--font-size-3xs);
          }
        }
      }
    }
  }
`;
