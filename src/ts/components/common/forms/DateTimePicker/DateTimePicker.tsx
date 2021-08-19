import styles from './DateTimePicker.module.css';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
export type DateTimePickerProps = {
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

const DateTimePicker = ({ setDate, defaultDate, timeLabel, dateLabel }: DateTimePickerProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(defaultDate);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      let newDate: Date | undefined = new Date(date.getTime());
      newDate?.setTime(newDate.getTime() - newDate.getTimezoneOffset() * 60 * 1000);
      setDate(newDate);
    }
  };

  useEffect(() => {
    let newDate: Date | undefined = new Date(defaultDate.getTime());
    newDate?.setTime(newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000);
    setCurrentDate(newDate);
  }, [defaultDate]);

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
              value={currentDate}
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
              value={currentDate}
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

export default DateTimePicker;
