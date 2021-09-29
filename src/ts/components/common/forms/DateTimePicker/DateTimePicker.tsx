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
  disabled?: boolean;
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#6f42c1',
    },
  },
});

const DateTimePicker = ({
  setDate,
  defaultDate,
  timeLabel,
  dateLabel,
  disabled = false,
}: DateTimePickerProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(defaultDate);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date);
    }
  };

  useEffect(() => {
    const newDate = new Date(defaultDate);
    setCurrentDate(newDate);
  }, [defaultDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <div className={styles.dataPickerContainer}>
            <KeyboardDatePicker
              margin="normal"
              variant="inline"
              label={dateLabel}
              format="MM/dd/yyyy"
              value={currentDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              disabled={disabled}
            />
          </div>
          <div className={styles.timePickerContainer}>
            <KeyboardTimePicker
              margin="normal"
              variant="inline"
              label={timeLabel}
              value={currentDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              disabled={disabled}
            />
          </div>
        </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
