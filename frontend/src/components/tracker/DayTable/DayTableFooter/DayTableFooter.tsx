import { TableDataType } from '../tableConfig';
import { DayTableFooterStyled } from './styled';

export interface DayTableFooterProps {
  dataSource?: TableDataType[];
}

const DayTableFooter = ({ dataSource }: DayTableFooterProps) => {
  return <DayTableFooterStyled></DayTableFooterStyled>;
};

export default DayTableFooter;
