import * as Yup from "yup";

import { BankView, ConsentView, PersonalView, UploadView } from "@com/view";
import { FormValueType } from "@type/contract";

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
    residence: Yup.string().required("주소 입력은 필수입니다."),
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
      residence: "",
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
    initialValues: { identification: "", bankbook: "" } as FormValueType,
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
