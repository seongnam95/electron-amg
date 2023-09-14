import {
  AddressField,
  BankInput,
  Header,
  IDInput,
  LabeledField,
  TextInput,
} from "@components";
import { PersonalPageStyled } from "./styled";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { WorkerData } from "@types";
import { AnimatePresence, motion } from "framer-motion";

interface Personal {
  name: string;
  phone: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "이름은 최소 2글자 이상이어야 합니다.")
    .max(14, "이름은 최대 14글자 이하여야 합니다.")
    .required("이름 입력은 필수입니다."),
  phone: Yup.string()
    .matches(
      /^(010)-?\d{4}-?\d{4}$/,
      "핸드폰 번호가 올바르게 입력되지 않았습니다."
    )
    .required("핸드폰 번호 입력은 필수입니다."),
});

const PersonalPage = () => {
  const [worker, setWorker] = useState<WorkerData>();
  const [showWorkerList, setShowWorkerList] = useState<boolean>(false);
  const [newInputSelected, setNewInputSelected] = useState<boolean>(false);
  const [workerList, setWorkerList] = useState<Array<WorkerData>>();

  const text = showWorkerList ? (
    <>
      이미 계약서를 작성한 기록이 있습니다.
      <br />
      기존 정보를 불러올까요?
    </>
  ) : (
    <>
      계약자(수급인)의 신분증과 통장 사본을 첨부해주세요.
      <br />
      본인 명의의 통장 또는 계좌번호가 아닐 경우
      <br />
      관리자에게 문의해주세요.
    </>
  );

  const initValues: Personal = {
    name: "",
    phone: "",
  };

  // 기존 근로자 API 호출
  const getWorkerList = (name: string) => {
    const params = { name: name };
    axios
      .get("http://localhost:8001/api/v1/worker/draw/", { params })
      .then((res) => {
        const data: WorkerData[] = res.data.result;
        setWorkerList(data);
      });
  };

  const getWorker = (data: Personal): boolean => {
    const worker = workerList?.find(
      (worker) => worker.name === data.name && worker.phone === data.phone
    );
    if (worker) setWorker(worker);
    return !!worker;
  };

  const { errors, touched, values, isValid, dirty, handleChange } = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  /**
   *
   */
  const handleNameBlur = () => {
    if (values.name !== "" && !errors.name) getWorkerList(values.name);
  };

  useEffect(() => {
    if (isValid && dirty) {
      if (getWorker(values)) setShowWorkerList(true);
      else {
        setNewInputSelected(true);
      }
    } else setShowWorkerList(false);
  }, [errors, touched]);

  return (
    <PersonalPageStyled>
      <Header title="AMG 용역 계약서 작성" text={text} />
      <AnimatePresence>
        {showWorkerList && !newInputSelected ? (
          <motion.div
            className="btn-wrap"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="card-btn outline"
              onClick={() => setNewInputSelected(true)}
            >
              <p className="btn-label">새로운 정보 입력</p>
            </button>

            <button className="card-btn">
              <p className="btn-label">과거 기록 불러오기</p>
              <div className="worker-info">
                <p className="text-address">{worker?.residence}</p>
                <p className="text-bank">
                  <b>카카오뱅크</b> 333303*****17
                </p>
              </div>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {newInputSelected ? (
        <AnimatePresence>
          <motion.div
            className="field-wrap"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </AnimatePresence>
      ) : null}

      <motion.div
        className="field-wrap"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <LabeledField label="계좌번호">
          <BankInput />
        </LabeledField> */}

        <TextInput
          name="name"
          placeholder="계약자 성명"
          onBlur={handleNameBlur}
          onChange={handleChange}
        />

        <TextInput
          name="phone"
          inputMode="tel"
          type="number"
          maxLength={11}
          placeholder="연락처"
          hint="'-' 하이픈 제외 숫자만 입력"
          onChange={handleChange}
          onCompleted={(v) => console.log(v)}
        />

        <IDInput onCompleted={(id: string) => console.log(id)} />
      </motion.div>
    </PersonalPageStyled>
  );
};

export default PersonalPage;
