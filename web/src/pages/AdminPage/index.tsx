import { Button, Icon, TextInput, View } from "@components";
import styled from "styled-components";
import { useRef, useState } from "react";
import { Salary } from "@types";

type ContractType = {
  salary: Salary;
  pay: number;
  startPeriod: string;
  endPeriod: string;
};

export function AdminPage() {
  const { today, endOfMonth } = getDateDefaults();
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");
  const [contract, setContract] = useState<ContractType>({
    salary: "daily",
    pay: 0,
    startPeriod: today,
    endPeriod: endOfMonth,
  });

  const payLabel =
    contract.salary === "daily"
      ? "용역 수수료 (일급)"
      : contract.salary === "weekly"
      ? "용역 수수료 (주급)"
      : "용역 수수료 (월급)";

  const salaryTypes = [
    {
      label: "일급",
      value: "daily",
    },
    {
      label: "주급",
      value: "weekly",
    },
    {
      label: "월급",
      value: "monthly",
    },
  ];

  function getDateDefaults() {
    const currentDate = new Date();
    const lastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;

    return {
      today: formatDate(currentDate),
      endOfMonth: formatDate(lastDate),
    };
  }

  function convertDateToString(date: string) {
    const day = date.split("-")[0].slice(2, 4);
    return day + date.split("-")[1] + date.split("-")[2];
  }

  function encodingData() {
    const data = `${contract.salary},${contract.pay},${convertDateToString(
      contract.startPeriod
    )},${convertDateToString(contract.endPeriod)}`;
    console.log(data);
    const base64Encoded = btoa(data);
    return encodeURIComponent(base64Encoded);
  }

  const handleOnCopy = async () => {
    try {
      const el = inputRef.current;
      el?.select();
      document.execCommand("copy");
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      alert(`클립보드 복사에 실패했습니다. \nErr: ${err}`);
    }
  };

  return (
    <StyledAdminPage>
      <View title="계약서 폼 생성">
        <div className="radio-wrap">
          {salaryTypes.map((salary) => (
            <label key={salary.value}>
              <input
                type="radio"
                onChange={() => {
                  setContract((prev) => {
                    return {
                      ...prev,
                      salary: salary.value as Salary,
                    };
                  });
                }}
                checked={salary.value === contract.salary}
              />
              <span>{salary.label}</span>
            </label>
          ))}
        </div>

        <TextInput
          value={contract.pay}
          onChange={(e) => {
            setContract((prev) => {
              return {
                ...prev,
                pay: Number(e.target.value),
              };
            });
          }}
        />
        <TextInput
          type="date"
          value={contract.startPeriod}
          onChange={(e) => {
            setContract((prev) => {
              return {
                ...prev,
                startPeriod: e.target.value,
              };
            });
          }}
        />
        <TextInput
          type="date"
          value={contract.endPeriod}
          onChange={(e) => {
            setContract((prev) => {
              return {
                ...prev,
                endPeriod: e.target.value,
              };
            });
          }}
        />
        {url ? (
          <div className="link-input" onClick={handleOnCopy}>
            <div className="link-icon">
              <Icon icon="linkOutline" size="2.4rem" color="#a7b0bc" />
            </div>
            <input readOnly ref={inputRef} className="link-text" value={url} />
            <button className="copy-btn">
              <Icon icon="copyOutline" size="1.8rem" color="white" />
            </button>
          </div>
        ) : null}
      </View>
      <Button
        fixed
        fullWidth
        onClick={() => setUrl(`http://amgcom.site/${encodingData()}`)}
        className="next-btn"
      >
        링크 생성
      </Button>
    </StyledAdminPage>
  );
}

// styled
const StyledAdminPage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  background-color: white;

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .link-input {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 0.4rem;
    box-shadow: var(--shadow-gray-100);
    height: 5.6rem;

    cursor: pointer;

    .link-icon {
      border-right: 1px solid var(--border-color);
      padding: 0 1.4rem;
    }

    .link-text {
      flex: 1;
      color: #acb4bf;
      font-size: var(--font-size-m);
      padding: 0 1.4rem;
      outline: none;
      border: none;
    }

    .copy-btn {
      height: 100%;
      outline: none;
      border: none;
      border-radius: 0.4rem;
      background-color: #4d90fd;
      padding: 0 2.6rem;

      font-size: var(--font-size-m);
    }
  }

  .radio-wrap {
    display: flex;
    height: 4.6rem;
    width: 100%;
    border: 1px solid var(--border-color);

    > label {
      flex: 1;
      font-size: var(--font-size-m);
      height: 100%;

      cursor: pointer;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      input[type="radio"] {
        display: none;

        &:checked + span {
          color: white;
          background-color: var(--primary);
        }
      }
    }

    label:not(:last-child) {
      border-right: 1px solid var(--border-color);
    }
  }
`;
