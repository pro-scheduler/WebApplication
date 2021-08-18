import styles from './DataTimePicker.module.css';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme, ThemeProvider } from '@material-ui/core';
export type DataTimePickerProps = {
  setDate: Function;
  timeLabel: String;
  dateLabel: String;
  defaultDate: Date;
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#6f42c1',
    },
  },
});

const DataTimePicker = ({ setDate, defaultDate, timeLabel, dateLabel }: DataTimePickerProps) => {
  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <div className={styles.dataPickerContainer}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              variant="inline"
              label={dateLabel}
              format="MM/dd/yyyy"
              value={defaultDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <div className={styles.timePickerContainer}>
            <KeyboardTimePicker
              margin="normal"
              variant="inline"
              id="time-picker"
              label={timeLabel}
              value={defaultDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </div>
        </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default DataTimePicker;
