import ReactDOM from 'react-dom';

import { EmployeeControlModalStyled } from './styled';

export interface EmployeeControlModalProps {}

const EmployeeControlModal = ({}: EmployeeControlModalProps) => {
  return ReactDOM.createPortal(
    <EmployeeControlModalStyled className="EmployeeControlModal"></EmployeeControlModalStyled>,
    document.body,
  );
};

export default EmployeeControlModal;
