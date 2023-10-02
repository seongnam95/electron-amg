import * as Yup from "yup";

import { AdditionalView, ArticleView, PersonalView, UploadView } from "@views";

const validationSchemas = {
  // 이름, 연락처, 주민등록번호
  personal: Yup.object().shape({
    name: Yup.string()
      .min(2, "이름은 최소 2글자 이상이어야 합니다.")
      .max(14, "이름은 최대 14글자 이하여야 합니다.")
      .required("이름 입력은 필수입니다."),
    phone: Yup.string()
      .matches(
        /^\d{3}\d{4}\d{4}$/,
        "핸드폰 번호가 올바르게 입력되지 않았습니다."
      )
      .required("핸드폰 번호 입력은 필수입니다."),
    idFront: Yup.string()
      .matches(/^\d{6}$/, "주민번호 앞자리는 숫자 6자리여야 합니다.")
      .required("주민번호 앞자리 입력은 필수입니다."),
    idBack: Yup.string()
      .matches(/^\d{7}$/, "주민번호 뒷자리는 숫자 7자리여야 합니다.")
      .required("주민번호 뒷자리 입력은 필수입니다."),
  }),

  // 주소, 은행명, 계좌번호
  additional: Yup.object().shape({
    residence: Yup.string().required("주소 입력은 필수입니다."),
    bank: Yup.string().required("은행 입력은 필수입니다."),
    bankNum: Yup.string().required("계좌번호 입력은 필수입니다."),
  }),

  // 신분증 이미지, 통장사본 이미지
  attachment: Yup.object().shape({
    idCard: Yup.string().required("신분증 이미지를 첨부해주세요."),
    bankBook: Yup.string().required("통장사본 이미지를 첨부해주세요."),
  }),
};

export const STEPS = [
  {
    viewComponent: PersonalView,
    validationSchema: validationSchemas.personal,
    initialValues: { name: "", phone: "", idFront: "", idBack: "" },
  },
  {
    viewComponent: AdditionalView,
    validationSchema: validationSchemas.additional,
    initialValues: { address: "", bank: "", bankNum: "" },
  },
  {
    viewComponent: UploadView,
    validationSchema: validationSchemas.attachment,
    initialValues: { identification: "", bankbook: "" },
  },
  {
    viewComponent: ArticleView,
    initialValues: { signBase64: "" },
  },
];
