import { useState } from 'react';

import { motion } from 'framer-motion';

import { EmployeeSidebar, EmployeeTable } from '@components/employee';

import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

const EmployeePage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');

  return (
    <EmployeePageStyled className="EmployeePage">
      <motion.div
        key={selectedGroupId}
        className="employee-content"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EmployeeTable className="table" />
        <EmployeeSidebar />
      </motion.div>
    </EmployeePageStyled>
  );
};

export default EmployeePage;
