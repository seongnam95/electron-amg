// import { atom, selectorFamily } from 'recoil';

// import { EmployeeData } from '~/types/employee';

// const mapEmployeeDataFromResponse = (employee: any): EmployeeData => ({
//   id: employee.id.toString(),
//   name: employee.name,
//   phone: employee.phone,
//   residence: employee.residence,
//   genderCode: employee.gender_code,
//   positionCode: employee.position_code,
//   createDate: employee.create_date,
//   groupId: employee.group_id ? employee.group_id.toString() : null,
// });

// const employeeState = atom<EmployeeData[]>({
//   key: 'employeeState',
//   default: [],
//   effects_UNSTABLE: [
//     ({ setSelf }) => {
//       fetchEmployees().then(response => {
//         if (response.success) {
//           const employees = response.result.map(mapEmployeeDataFromResponse);
//           setSelf(employees);
//         }
//       });
//     },
//   ],
// });

// const filteredEmployeeState = selectorFamily<EmployeeData[], string>({
//   key: 'filteredEmployeeState',
//   get:
//     groupId =>
//     ({ get }) => {
//       const employees = get(employeeState);

//       switch (groupId) {
//         case 'all':
//           return employees;
//         case 'etc':
//           return employees.filter(employee => employee.groupId === null);
//         default:
//           return employees.filter(employee => employee.groupId === groupId);
//       }
//     },
// });

// export { employeeState, filteredEmployeeState };
