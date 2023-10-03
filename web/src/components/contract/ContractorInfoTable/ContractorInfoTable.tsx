import { ContractState, ContractorState } from "@stores/contract";
import { useRecoilValue } from "recoil";
import {
  ContractorInfoTablePrintStyled,
  ContractorInfoTableStyled,
} from "./styled";

interface ContractorInfoTableProps {
  printView?: boolean;
  onClickSign?: () => void;
}

function ContractorInfoTable({
  printView,
  onClickSign,
}: ContractorInfoTableProps) {
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
    return (
      <ContractorInfoTablePrintStyled>
        {ContractorContent}
      </ContractorInfoTablePrintStyled>
    );
  } else {
    return (
      <ContractorInfoTableStyled>{ContractorContent}</ContractorInfoTableStyled>
    );
  }
}

export default ContractorInfoTable;
