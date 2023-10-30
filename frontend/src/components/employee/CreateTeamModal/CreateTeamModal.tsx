import ReactDOM from 'react-dom';

import { CreateTeamModalStyled } from './styled';

export interface CreateTeamModalProps {}

const CreateTeamModal = ({}: CreateTeamModalProps) => {
  return ReactDOM.createPortal(
    <CreateTeamModalStyled className="CreateTeamModal"></CreateTeamModalStyled>,
    document.body,
  );
};

export default CreateTeamModal;
