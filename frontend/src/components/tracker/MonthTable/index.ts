import _MonthTable from './MonthTable';
import Row from './Row';

type _MonthTable = typeof _MonthTable;

interface MonthTableType extends _MonthTable {
  Row: typeof Row;
}

const MonthTable = _MonthTable as MonthTableType;

MonthTable.Row = Row;

export default MonthTable;
