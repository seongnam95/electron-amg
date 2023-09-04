import { useEffect, useRef } from 'react';

import { ColorPicker, ModalProps, Select } from 'antd';
import { ColorValueType, PresetsItem } from 'antd/es/color-picker/interface';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Lottie from 'lottie-react';
import * as Yup from 'yup';

import loadingLottie from '~/assets/lotties/loading.json';
import Button from '~/components/common/Button';
import { GroupRequestBody, useEasyMutation } from '~/hooks/queryHooks/useGroup';
import { useUserQuery } from '~/hooks/queryHooks/useUser';
import { GroupData } from '~/types/group';
import { isEmptyObj, removeEmptyValueObj } from '~/utils/objectUtil';

import { GroupEditorModalStyled } from './styled';

export interface GroupEditorModalProps extends ModalProps {
  group?: GroupData;
  create?: boolean;
  onClose?: () => void;
}

const GroupEditorModal = ({
  group,
  open,
  onClose,
  create = false,
  ...rest
}: GroupEditorModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { isLoading, createMutate, updateMutate } = useEasyMutation<GroupRequestBody>(
    ['group'],
    import.meta.env.VITE_GROUP_API_URL,
  );

  const initGroup: GroupRequestBody = group
    ? {
        id: group.id,
        name: group.name,
        explanation: group.explanation,
        hexColor: group.hexColor,
      }
    : {
        id: '',
        name: '',
        explanation: '',
        hexColor: '',
      };

  const initColors: PresetsItem[] = [
    {
      label: '기본 컬러',
      colors: ['#FE8730', '#FA5454', '7230FE'],
    },
  ];

  const { users } = useUserQuery({
    enabled: open,
  });

  const userOptions = [
    { value: '', label: '( 담당자 없음 )' },
    ...(users
      ? users.map(v => ({
          value: v.id,
          label: `${v.name} (${v.username})`,
        }))
      : []),
  ];

  const createValidation = Yup.object({
    name: Yup.string().required('그룹명은 필수 사항입니다.'),
    hexColor: Yup.string().required('그룹 컬러는 필수 사항입니다.'),
  });

  // 폼 리셋, Name Input 포커스
  useEffect(() => {
    if (open) {
      formik.resetForm({ values: initGroup });
      nameInputRef.current?.focus();
    }
  }, [open, group]);

  const handleSubmit = (values: GroupRequestBody) => {
    if (create)
      createMutate(values, {
        onSuccess: onClose,
      });
    else if (group) {
      const validBody = removeEmptyValueObj(values);

      if (!isEmptyObj(validBody)) {
        const newGroup = {
          id: group.id,
          ...validBody,
        };

        updateMutate(newGroup, {
          onSuccess: onClose,
        });
      }
    }
  };

  // Formik Hook
  const formik = useFormik({
    initialValues: initGroup,
    onSubmit: handleSubmit,
    validationSchema: create && createValidation,
  });

  // Footer 버튼 렌더러
  const RenderFooter = () => (
    <div className={clsx('footer-wrap', create && 'create')}>
      <span className="err-msg">{formik.errors.name || formik.errors.hexColor}</span>
      <div className="btn-wrap">
        <Button className="btn-cancel" styled={{ variations: 'link' }} onClick={onClose}>
          취소
        </Button>
        <Button className="btn-ok" styled={{ variations: 'link' }} onClick={formik.submitForm}>
          {create ? '그룹 생성' : '저장'}
        </Button>
      </div>
    </div>
  );

  return (
    <GroupEditorModalStyled
      title={`그룹 ${create ? '생성' : '편집'}`}
      open={open}
      centered
      footer={<RenderFooter />}
      {...rest}
    >
      <div className="title-color-row">
        {/* 그룹명 */}
        <input
          ref={nameInputRef}
          name="name"
          className="input-name"
          spellCheck={false}
          placeholder={group ? group.name : '그룹명'}
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        {/* 그룹 컬러 */}
        <ColorPicker
          disabledAlpha
          value={formik.values.hexColor}
          presets={initColors}
          onChangeComplete={color => {
            formik.handleChange({
              target: {
                name: 'hexColor',
                value: color.toHexString(),
              },
            });
          }}
        />
      </div>

      {/* 그룹 설명 */}
      <input
        name="explanation"
        className="input-explanation"
        value={formik.values.explanation}
        spellCheck={false}
        placeholder={group && group.explanation ? group.explanation : '그룹 설명 (선택)'}
        onChange={formik.handleChange}
      />

      {/* 그룹 담당자 */}
      <Select
        className="user-selector"
        options={userOptions}
        value={formik.values.userId}
        placeholder={
          group && group.user ? `${group.user.name} (${group.user.username})` : '그룹 담당자 (선택)'
        }
        onChange={userId => {
          formik.handleChange({
            target: {
              name: 'userId',
              value: userId,
            },
          });
        }}
      />

      {isLoading && (
        <div className="loading-box">
          <Lottie className="complete-icon" animationData={loadingLottie} />
        </div>
      )}
    </GroupEditorModalStyled>
  );
};

export default GroupEditorModal;
