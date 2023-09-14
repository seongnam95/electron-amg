import { Field } from "formik";
import { AddressField, TextInput } from "@components";
import styled from "styled-components";

export function PersonalView() {
  return (
    <StyledPersonalView>
      <Field
        as={TextInput}
        label="이름"
        placeholder="계약자 성명"
        name="name"
      />

      <Field
        as={TextInput}
        label="연락처"
        placeholder='"-" 하이픈 제외 숫자만 입력'
        name="phone"
        inputMode="tel"
        onKeyPress={(event: any) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />

      <Field as={AddressField} name="address" label="거주지" />

      <div className="personal-field-wrap">
        <span className="field-label">계좌번호</span>
        <div className="bank-field">
          <Field as={TextInput} placeholder="은행명" name="bank" />
          <Field
            as={TextInput}
            placeholder='"-" 하이픈 제외 숫자만 입력'
            name="bankNum"
            inputMode="tel"
            onKeyPress={(event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </StyledPersonalView>
  );
}

const StyledPersonalView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .personal-field-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .field-label {
      font-size: var(--font-size-xs);
      font-weight: bold;
      color: var(--text);
      padding-left: 0.4rem;
    }

    .address-field {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .bank-field {
      display: flex;
      gap: 0.8rem;

      > input:first-child {
        width: 30%;
      }

      > input:last-child {
        flex: 1;
      }
    }
  }
`;
