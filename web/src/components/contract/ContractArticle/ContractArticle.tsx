import { ContractState, ContractorState } from "@stores/contract";
import { formatDate } from "@utils/formatDate";
import { useRecoilValue } from "recoil";
import { ContractArticlePrintStyled, ContractArticleStyled } from "./styled";

interface ContractArticleProps {
  printView?: boolean;
}

function ContractArticle({ printView }: ContractArticleProps) {
  const { name } = useRecoilValue(ContractorState);
  const { salary, defaultWage, startPeriod, endPeriod, groupName } =
    useRecoilValue(ContractState);
  const salaryText =
    salary === "daily" ? "일당" : salary === "weekly" ? "주급" : "월급";

  const ArticleContent = (
    <>
      <p>
        도급인 AMG(이하 “甲”이라 한다)와 수급인
        <span className="text-accent"> {name}</span> (이하 “乙”이라 한다)은(는)
        다음과 같이 용역 계약을 체결하고 상호 성실히 준수할 것을 약정한다.
      </p>
      <div className="article-content">
        <div className="text-block">
          <span className="text-title">제1조 (계약의 목적) </span>
          <span>
            본 계약은 乙이
            <b> 독립적인 위치에서 용역을 제공</b>하고 그 대가를 일정 계약된
            방식에 따라 수수료를 지급 받는
            <b> 용역 계약</b>으로서 甲에 종속된
            <b> 근로계약과는 다름</b>을 분명히 한다.
          </span>
        </div>
        <div className="text-block">
          <span className="text-title">제2조 (용역범위 및 성실의무) </span>
          <span>
            甲은 乙에게 甲의{" "}
            <span className="text-underline">
              모델하우스 행사 관련 업무 일체(고객 응대, 사무보조, 용품 전달,
              전단지 배포, 운전업무 등 서비스 전반)
            </span>
            를 위탁하고, 乙은 이를 신의성실의 원칙에 따라 협업의 취지에 벗어나지
            않는 범위 내에서 독립적으로 수행한다.
          </span>
        </div>
        <div className="text-block">
          <span className="text-title">제3조 (계약기간) </span>
          <span>
            본 계약은{" "}
            <span className="text-accent">{formatDate(startPeriod)}</span>부터{" "}
            <span className="text-accent">{formatDate(endPeriod)}</span>까지로
            한다. 단, 계약기간 만료 전 용역 업무 수행 대상 행사 현장이 종료되는
            경우 본 계약 또한 종료되는 것으로 한다.
          </span>
        </div>
        <div className="text-block">
          <span className="text-title">
            제4조 (용역 수행 방법 및 편의 제공)
          </span>
          <div className="text-list">
            <div className="list-item">
              <span className="list-number">①</span>
              <p>
                乙은 업무 시 乙의 재량에 의해 이를 진행하며, 이에 따른 이윤의
                창출 및 손실, 책임 등의 위험을 스스로의 책임하에 부담, 주도한다.
              </p>
            </div>
            <div className="list-item">
              <span className="list-number">②</span>
              <p>
                乙의 용역업무 수행을 위한 장소 및 시간은 업무에 지장이 없는 범위
                내에서 甲의 사정을 고려하여 乙과 사전 협의하여 정하기 로 하며,
                乙은 甲의 업무상 필요와 乙의 업무상 편의를 위해 甲이 제공한
                장소에서 용역 업무를 수행할 수 있다. 이 경우 乙은 甲 이 정한
                입·퇴실 시간 등의 시설관리방침을 준수하여야 한다.
              </p>
            </div>
            <div className="list-item">
              <span className="list-number">③</span>
              <p>
                乙은 원칙적으로 용역 업무에 필요한 기계·기구, 제품, 설비 등을
                자신의 비용으로 구입하여 사용하여야 한다. 다만 甲은 乙이
                작업하는데 필요 한 장소 및 자료, 도구 등의 제반 수단을 무상으로
                제공할 수 있으며, 이는 乙의 원활한 업무 수행을 위한 편의
                제공이라는 목적을 지닌다.
              </p>
            </div>
            <div className="list-item">
              <span className="list-number">④</span>
              <p>
                乙은 甲이 제공한 장소 및 자료, 도구 등을 본건 작업 이외에는
                사용할 수 없으며, 선량한 관리자로서의 주의의무를 다하여 사용
                하여야 한다.
              </p>
            </div>
          </div>
        </div>
        <div className="text-block">
          <span className="text-title">제5조 (용역 수수료)</span>
          <div className="text-list">
            <div className="list-item">
              <span className="list-number">①</span>
              <p>
                용역 수수료는 {salaryText}{" "}
                <span className="text-accent">
                  {Number(defaultWage).toLocaleString()}원
                </span>
                으로 하며, 甲은 당월 1일부터 말일까지 乙의 용역 수행에 따라
                계산된 금액을 익월 15일에 乙 의 금융계좌에 입금한다. 단, 하루의
                업무 범위를 벗어나 추가로 용역을 수행하는 경우 지급되는 수수료는
                별도 협의에 의한다.
              </p>
            </div>
            <div className="list-item">
              <span className="list-number">②</span>
              <p>
                乙은 소득세법 제127조의 규정에 의해 제1항의 수수료에 대한
                제세공과금을 부담하며, 甲은 수수료 지급 시 3.3%(주민세 포함) 의
                원천징수액을 차감한 다음 지급한다.
              </p>
            </div>
          </div>
        </div>
        <div className="text-block">
          <span className="text-title">제6조 (계약의 해지) </span>
          <span>
            甲과 乙은 다음 각 호의 사유가 발생하였을 경우 본 계약을 해지할 수
            있다.
          </span>
          <div className="text-list">
            <p>1. 甲과 乙이 본 계약을 위반한 경우</p>
            <p>
              2. 乙의 서비스 제공에 대한 불평, 불만을 월 1회 이상 받았을 경우
            </p>
            <p>
              3. 乙이 정당한 사유 없이 현장에 1일 이상 나오지 아니할 경우 또는
              2회 이상 정해진 입실 시간보다 늦게 입장하는 경우{" "}
            </p>
            <p>
              4. 乙의 난폭운전 또는 도로교통법 위반행위가 원인이 되어 甲에게
              벌금 또는 사고 부담금 등이 발생하였을 경우
            </p>
            <p>
              5. 甲이 천재지변이나 경영 사정에 의해 사업을 유지하기 어려워 당해
              사업을 폐업하거나 제3자에게 사업을 처분하는 경우
            </p>
            <p>
              6. 乙이 사업장 내 다른 동업자들과 불화를 일으켜 다른 동업자의
              계약해지를 유발하거나 이를 방지하기 위한 甲의 권고를 의도적 으로
              무시하여 甲의 정상적인 행사 진행 활동 및 고객서비스가 원활하게
              이루어지는 것을 방해하는 경우
            </p>
            <p>
              7. 기타 甲의 경영상 사정 또는 乙의 귀책사유 등 기타의 사정으로
              乙과의 계약 관계를 계속 유지할 수 없다고 판단되는 경우
            </p>
          </div>
        </div>
        <div className="text-block">
          <span className="text-title">제7조 (배상책임) </span>
          <span>
            乙이 다음 각호의 사유로 甲에게 손해를 발생케 한 경우 甲은 이에 대한
            배상을 청구할 수 있다.
          </span>
          <div className="text-list">
            <p>1. 乙이 본 계약의 제6조에 해당하였을 경우</p>
            <p>
              2. 기타 乙의 귀책사유로 인하여 본 계약이 불이행되거나 甲에게
              손해가 발생한 경우
            </p>
          </div>
        </div>
        <div className="text-block">
          <span className="text-title">제8조 (기타사항)</span>
          <div className="text-list">
            <div className="list-item">
              <span className="list-number">①</span>
              <p>
                본 계약에 명기하지 아니한 사항 및 본 계약에 해석상의 이의가 있을
                때는 甲과 乙 쌍방의 협의에 따라 결정한다. 다만, 협의가 원만하지
                않을 경우 甲의 해석에 따른다.
              </p>
            </div>
            <div className="list-item">
              <span className="list-number">②</span>
              <p>
                본 계약에 의하여 발생하는 분쟁 및 소송사건의 관할 법원은 甲의
                소재지로 한다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p>
        위와 같이 甲과 乙은 용역 계약을 체결하며, 계약의 성립을 증명하기 위하여
        계약서 2부를 작성하여 甲과 乙이 기명 날인 또는 서명한 후 각자 1부씩
        보관하기로 한다.
      </p>
      <p className="contract-date">{formatDate(startPeriod)}</p>
    </>
  );
  if (printView) {
    return (
      <ContractArticlePrintStyled>{ArticleContent}</ContractArticlePrintStyled>
    );
  } else {
    return <ContractArticleStyled>{ArticleContent}</ContractArticleStyled>;
  }
}

export default ContractArticle;
