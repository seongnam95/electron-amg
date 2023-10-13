import { EmployeeData } from '~/types/employee';

// 검색 필터링
export const searchEmployee = (
  employees: Array<EmployeeData>,
  searchTerm: string,
): Array<EmployeeData> => {
  return employees.filter(
    employee =>
      employee.name.includes(searchTerm) ||
      employee.residence.includes(searchTerm) ||
      employee.phone.includes(searchTerm) ||
      employee.contract?.groupName.includes(searchTerm),
  );
};

// 정렬
export const sortedEmployees = (
  employees: Array<EmployeeData>,
  searchTerm: string,
  sort: string,
) => {
  const filteredEmployees = employees.filter(
    employee =>
      employee.name.includes(searchTerm) ||
      employee.residence.includes(searchTerm) ||
      employee.phone.includes(searchTerm) ||
      employee.contract?.groupName.includes(searchTerm),
  );

  switch (sort) {
    case 'name':
      return [...filteredEmployees].sort((a, b) => a.name.localeCompare(b.name));
    case 'default':
    default:
      return filteredEmployees;
  }
};
