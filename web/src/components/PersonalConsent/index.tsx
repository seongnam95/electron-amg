import styled from "styled-components";

interface PersonalConsentProps {}

export function PersonalConsent({}: PersonalConsentProps) {
  return (
    <StyledPersonalConsent>
      <div>
        <h1>1. 개인정보 수집 및 이용</h1>
        <section>
          <h2>수집 항목</h2>
          <p>이름, 주민등록번호, 연락처, 주소, 계좌번호 등 인적사항</p>
        </section>
        <section>
          <h2>수집 목적</h2>
          <p>
            소득세법 제2조에 따라 기타소득세(지 방소득세 포함) 원천징수,
            원천징수 내역 신고 및 납세를 위해 제3자(국세청 및 지방자치단체)에게
            제공
          </p>
        </section>
        <section>
          <h2>보유 및 이용기간</h2>
          <p>
            수집‧이용 동의일로부터 개인정보의 수집‧이용목적을 달성할 때까지
            (최장 6개월)
          </p>
        </section>
        <section>
          <p>
            <span className="accent-text">*</span> 주민등록번호 수집 및 이용,
            제3자 제공에 대한 안내 (수집근거) 소득세법 제145조, 제164조에 따라
            원천징수 처리의 제반 업무 처리를 위해 법령에서 주민등록번호의 처리를
            요구 · 허용한 경우로, 소득자의 정확한 식별을 이해 수집 · 이용합니다.
            소득세법 시행령 제185조(원천징수세액의납부)에 의거하여 국세청에
            원천징수 이행상황 신고의 목적으로 성명, 주소, 주민등록번호 정보를
            제한적으로 제공합니다.
          </p>
        </section>
      </div>
      <div>
        <h1>2. 개인정보 제3자 제공에 관한 사항</h1>
        <section>
          <h2>제공대상 기관</h2>
          <p>
            귀하의 개인정보는 국세청 및 지방자치단체에 원천징수내역 신 고 및
            납세 시 제공
          </p>
        </section>
        <section>
          <h2>제공 목적</h2>
          <p>소득세법 제2조(납세의무), 제7조(원천징수 등의 경우의 납세자)</p>
        </section>
        <section>
          <h2>제공 항목</h2>
          <p>
            고유식별정보(주민등록번호), 성명, 주소, 지급 계좌번호, 지급액,
            원천징수세액
          </p>
        </section>
        <section>
          <p>
            <span className="accent-text">*</span> 동의를 거부할 권리 및 동의를
            거부할 경우의 불이익 : 위 개인정보의 수집·보유·제공에 동의하지
            않으실 경우 AMG는 대가지급(위촉수당, 자문료 등)이 불가합니다.
          </p>
        </section>
      </div>
    </StyledPersonalConsent>
  );
}

const StyledPersonalConsent = styled.div`
  div {
    margin-bottom: 4rem;
  }

  section {
    padding: 0.4rem 0.8rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    margin-bottom: 2rem;
    line-height: 120%;
  }

  h2 {
    font-size: var(--font-size-m);
    font-weight: bold;
    margin-bottom: 0.6rem;
  }

  p {
    font-size: var(--font-size-m);
    line-height: 130%;
    margin-bottom: 0.4rem;
  }

  .accent-text {
    color: #7c32cf;
  }
`;
