import * as Yup from "yup";

import { BankView, ConsentView, PersonalView, UploadView } from "@com/view";
import { FormValueType } from "~/types/types";

export const StepHeaders = [
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
];

const validationSchemas = {
  // 이름, 연락처, 주민등록번호
  personal: Yup.object().shape({
    name: Yup.string()
      .min(2, "이름은 최소 2글자 이상이어야 합니다.")
      .max(14, "이름은 최대 14글자 이하여야 합니다.")
      .required("이름 입력은 필수입니다."),
    idFront: Yup.string()
      .matches(/^\d{6}$/, "주민번호 앞자리는 숫자 6자리여야 합니다.")
      .required("주민번호 앞자리 입력은 필수입니다."),
    idBack: Yup.string()
      .matches(/^\d{7}$/, "주민번호 뒷자리는 숫자 7자리여야 합니다.")
      .required("주민번호 뒷자리 입력은 필수입니다."),
    phone: Yup.string()
      .matches(
        /^\d{3}\d{4}\d{4}$/,
        "핸드폰 번호가 올바르게 입력되지 않았습니다."
      )
      .required("핸드폰 번호 입력은 필수입니다."),
    address: Yup.string().required("주소 입력은 필수입니다."),
  }),

  // 주소, 은행명, 계좌번호
  bank: Yup.object().shape({
    bankNum: Yup.string().required(),
    bank: Yup.string().required(),
  }),

  // 신분증 이미지, 통장사본 이미지
  attachment: Yup.object().shape({
    idCard: Yup.string().required(),
    bankBook: Yup.string().required(),
  }),

  // 동의 및 서명
  consent: Yup.object().shape({
    contractConsent: Yup.boolean().required().oneOf([true]),
    personalConsent: Yup.boolean().required().oneOf([true]),
    signBase64: Yup.string().required(),
  }),
};

export const STEPS = [
  {
    viewComponent: PersonalView,
    validationSchema: validationSchemas.personal,
    initialValues: {
      name: "",
      idFront: "",
      idBack: "",
      phone: "",
      address: "",
    } as FormValueType,
  },
  {
    viewComponent: BankView,
    validationSchema: validationSchemas.bank,
    initialValues: { bankNum: "", bank: "" } as FormValueType,
  },
  {
    viewComponent: UploadView,
    validationSchema: validationSchemas.attachment,
    initialValues: { idCard: "", bankBook: "" } as FormValueType,
  },
  {
    viewComponent: ConsentView,
    validationSchema: validationSchemas.consent,
    initialValues: {
      contractConsent: false,
      personalConsent: false,
      signBase64: "",
    } as FormValueType,
  },
];
