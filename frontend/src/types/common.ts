import { ReactNode } from 'react';

import { FormRule } from 'antd';

export interface FormItemData {
  name?: string;
  label?: string;
  rules?: FormRule[];
  component?: ReactNode;
  child?: ReactNode;
}
