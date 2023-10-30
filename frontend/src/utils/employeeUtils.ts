import { EmployeeData } from '~/types/employee';

// 검색 필터링
export const searchEmployee = (
  employees: Array<EmployeeData>,
  searchTerm: string,
): Array<EmployeeData> => {
  return employees.filter(
    employee =>
      employee.name.includes(searchTerm) ||
      employee.address.includes(searchTerm) ||
      employee.phone.includes(searchTerm) ||
      employee.contract?.groupName.includes(searchTerm),
  );
};
