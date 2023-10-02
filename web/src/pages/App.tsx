import { AdminPage, CompletePage, ContractPage, DocumentPage } from "@pages";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import styled from "styled-components";

export function App() {
  useEffect(() => {
    const setScreenHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setScreenHeight();
    window.addEventListener("resize", setScreenHeight);
    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  return (
    <StyledApp>
      <RecoilRoot>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/draw/:id" element={<ContractPage />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/document" element={<DocumentPage />} />
        </Routes>
      </RecoilRoot>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;
