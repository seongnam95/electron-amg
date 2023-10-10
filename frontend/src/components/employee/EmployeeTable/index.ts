// === Automatically generated file. Don't edit it. ===
import _EmployeeTable from './EmployeeTable';
import Row from './Row';

type _EmployeeTable = typeof _EmployeeTable;

interface EmployeeTableType extends _EmployeeTable {
  Row: typeof Row;
}

const EmployeeTable = _EmployeeTable as EmployeeTableType;

EmployeeTable.Row = Row;

export default EmployeeTable;
