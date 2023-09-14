import styled from "styled-components";
import { TextInput } from "../TextInput";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface IDInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onCompleted?: (id: string) => void;
}

export const IDInput = ({ onCompleted }: IDInputProps) => {
  const backRef = useRef<HTMLInputElement>(null);
  const [workerID, setWorkerID] = useState({ front: "", back: "" });

  useEffect(() => console.log(workerID), [workerID]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setWorkerID({
      ...workerID,
      [id]: value,
    });
  };

  const handleComplete = () => {
    console.log(workerID.front, workerID.front.length);

    if (workerID.front.length === 6) {
      console.log("in");
      onCompleted?.(`${workerID.front}${workerID.back}`);
    }
  };

  //
  return (
    <IDInputStyled>
      <TextInput
        id="front"
        type="number"
        maxLength={6}
        placeholder="주민등록번호"
        onChange={handleChange}
        onCompleted={() => backRef.current?.focus()}
      />
      <TextInput
        id="back"
        inputRef={backRef}
        maxLength={7}
        type="password"
        onChange={handleChange}
        onCompleted={handleComplete}
      />
    </IDInputStyled>
  );
};

const IDInputStyled = styled.div`
  display: flex;
  gap: 0.8rem;

  > input {
    flex: 1;
  }
`;
