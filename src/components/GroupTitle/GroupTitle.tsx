import React, { useEffect, useState } from 'react';

import { GroupData } from '~/types/group';

import GroupEditorModal from '../GroupEditorModal';
import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  group?: GroupData;
  headerText?: string;
}

const GroupTitle = ({ headerText, group }: GroupTitleProps) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const doesExist = !!group;

  useEffect(() => console.log(showEditor), [showEditor]);

  const hideEditorModal = () => setShowEditor(false);
  const handleOnClickEditor = () => {
    if (doesExist) {
      setShowEditor(true);
    }
  };

  return (
    <GroupTitleStyled className="GroupTitle" doesExist={doesExist} onClick={handleOnClickEditor}>
      <div className={'header-text'}>
        {headerText}

        {doesExist && group.explanation && (
          <span className="explanation-text">{group.explanation}</span>
        )}

        {doesExist && group.userName && (
          <span className="manager-text">
            담당자 <span className="manager-name">{group.userName}</span>
          </span>
        )}
      </div>

      {doesExist && (
        <GroupEditorModal
          targetGroup={group}
          open={showEditor}
          onSubmit={hideEditorModal}
          onCancel={hideEditorModal}
        />
      )}
    </GroupTitleStyled>
  );
};

export default React.memo(GroupTitle);
