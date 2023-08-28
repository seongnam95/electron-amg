import { useState } from 'react';
import { useMutation } from 'react-query';

import { updateGroup } from '~/api/group';
import Button from '~/components/common/Button';
import { GroupData } from '~/types/group';

import GroupEditorModal from '../GroupEditorModal';
import { GroupTitleStyled } from './styled';

export interface GroupTitleProps {
  group?: GroupData;
  headerText?: string;
}

const GroupTitle = ({ headerText, group }: GroupTitleProps) => {
  const doesExistGroup = !!group;

  const [showEditor, setShowEditor] = useState<boolean>(false);

  const { mutate } = useMutation(updateGroup, {
    onSuccess: () => {
      setShowEditor(false);
    },
  });

  return (
    <GroupTitleStyled className="GroupTitle" doesExist={doesExistGroup}>
      <div className="header-text" onClick={() => setShowEditor(true)}>
        {headerText}

        {doesExistGroup && group.explanation && (
          <span className="explanation-text">{group.explanation}</span>
        )}

        {doesExistGroup && group.userName && (
          <span className="manager-text">
            담당자 <span className="manager-name">{group.userName}</span>
          </span>
        )}
      </div>

      {doesExistGroup && (
        <>
          <GroupEditorModal
            targetGroup={group}
            open={showEditor}
            onSubmit={() => mutate(group)}
            onCancel={() => setShowEditor(false)}
          />
        </>
      )}
    </GroupTitleStyled>
  );
};

export default GroupTitle;
