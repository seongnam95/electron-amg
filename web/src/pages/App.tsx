import { AdminPage, CompletePage, ContractPage, DocumentPage } from "@pages";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import PersonalPage from "./PersonalPage";

export function App() {
  return (
    <StyledApp>
      <RecoilRoot>
        <Routes>
          <Route path="/:params" element={<ContractPage />} />
          {/* <Route path="/contract/:params" element={<ContractPage />} /> */}
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/draw/:params" element={<PersonalPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </RecoilRoot>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: 100vh;
`;
