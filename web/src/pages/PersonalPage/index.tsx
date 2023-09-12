import { TextField, View } from "@components";
import { PersonalPageStyled } from "./styled";
import { ChangeEvent, useState } from "react";
import axios from "axios";

interface Personal {
  name: string;
  number: string;
}

const PersonalPage = () => {
  const [personal, setPersonal] = useState<Personal>({
    name: "",
    number: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPersonal({
      ...personal,
      [id]: value,
    });
  };

  const handleBlurName = () => {
    if (personal.name.length > 1) {
      const params = { name: personal.name };
      axios
        .get("http://localhost:8001/api/v1/worker/draw/", { params })
        .then((res) => console.log(res.data))
        .catch((res) => console.log(res));
    }
  };

  return (
    <PersonalPageStyled>
      <View title="근로자 정보" text={"정보입력"}>
        <TextField
          label="이름"
          id="name"
          value={personal?.name}
          placeholder="계약자 성명"
          onChange={handleChange}
          onBlur={handleBlurName}
        />
        <TextField
          label="연락처"
          id="number"
          placeholder="계약자 성명"
          onChange={handleChange}
        />
      </View>
    </PersonalPageStyled>
  );
};

export default PersonalPage;
