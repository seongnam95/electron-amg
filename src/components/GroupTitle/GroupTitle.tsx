import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { filteredGroupState } from '~/stores/group';

import GroupEditorModal from '../GroupEditorModal';
import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  groupId: string;
}

const GroupTitle = ({ groupId }: GroupTitleProps) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const group = useRecoilValue(filteredGroupState(groupId));

  const headerText = groupId === 'all' ? '전체' : groupId === 'etc' ? '기타' : group.name;
  const doesExist = !!group;

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

      <GroupEditorModal
        targetGroup={group}
        open={showEditor}
        onSubmit={hideEditorModal}
        onCancel={hideEditorModal}
      />
    </GroupTitleStyled>
  );
};

export default React.memo(GroupTitle);
