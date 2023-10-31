import generateRangePicker from 'antd/es/date-picker/generatePicker/generateRangePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { RangeValue } from 'rc-picker/lib/interface';

const DateRangePicker = generateRangePicker<Dayjs>(dayjsGenerateConfig);

interface AntDateRangePickerProps {
  onChange?: (values: RangeValue<Dayjs>, formatString: [string, string]) => void;
}

const AntDateRangePicker = (props: AntDateRangePickerProps) => {
  return <DateRangePicker inputReadOnly {...props} />;
};

export default AntDateRangePicker;
