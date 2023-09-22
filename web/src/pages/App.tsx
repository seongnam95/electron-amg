import { AdminPage, CompletePage, ContractPage, DocumentPage } from "@pages";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import styled from "styled-components";

export function App() {
  return (
    <StyledApp>
      <RecoilRoot>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/draw/:params" element={<ContractPage />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/document" element={<DocumentPage />} />
        </Routes>
      </RecoilRoot>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: 100vh;
`;
