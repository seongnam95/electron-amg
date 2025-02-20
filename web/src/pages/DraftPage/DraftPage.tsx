// import { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Header } from "@com/layout";
// import { DraftContractView, DraftHistoryView } from "@com/view";
// import { BottomSheetModal } from "@com/common";
// import { DraftPageStyled } from "./styled";
// import { BiHistory } from "react-icons/bi";

// function DraftPage() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const handleOnCopy = async (formId: string) => {
//     if (inputRef.current) {
//       inputRef.current.value = `http://amgcom.site/${formId}`;
//       setClipboard();
//     }
//   };

//   const setClipboard = async () => {
//     try {
//       const el = inputRef?.current;
//       el?.select();
//       document.execCommand("copy");
//       alert("클립보드에 복사되었습니다.");
//     } catch (err) {
//       alert(`클립보드 복사에 실패했습니다. \nErr: ${err}`);
//     }
//   };

//   return (
//     <DraftPageStyled>
//       <Header
//         height="4rem"
//         title="AMG"
//         actionIcon={<BiHistory />}
//         actionOnClick={() => {
//           setShowModal(true);
//         }}
//       />

//       <motion.div
//         className="content-wrap"
//         style={{ height: "100%" }}
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <DraftContractView onCopyId={handleOnCopy} />
//       </motion.div>

//       <BottomSheetModal
//         open={showModal}
//         title="이전 기록"
//         onClose={() => setShowModal(false)}
//       >
//         <DraftHistoryView onCopy={handleOnCopy} />
//       </BottomSheetModal>
//       <input readOnly ref={inputRef} className="link-text" />
//     </DraftPageStyled>
//   );
// }

// export default DraftPage;
