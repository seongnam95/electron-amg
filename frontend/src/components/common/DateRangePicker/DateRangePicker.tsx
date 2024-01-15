import generateRangePicker from 'antd/es/date-picker/generatePicker/generateRangePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { RangeValue } from 'rc-picker/lib/interface';

const DateRangePicker = generateRangePicker<Dayjs>(dayjsGenerateConfig);

interface AntDateRangePickerProps {
  fullWidth?: boolean;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;
  onChange?: (values: RangeValue<Dayjs>, formatString: [string, string]) => void;
}

const AntDateRangePicker = ({ fullWidth, onChange, ...rest }: AntDateRangePickerProps) => {
  return (
    <DateRangePicker
      inputReadOnly
      style={{ width: fullWidth ? '100%' : 'auto' }}
      onChange={onChange}
      {...rest}
    />
  );
};

export default AntDateRangePicker;
