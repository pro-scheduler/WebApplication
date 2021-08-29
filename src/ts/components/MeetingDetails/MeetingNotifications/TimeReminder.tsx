import Card from '../../common/Card/Card';
import Checkbox from '../../common/forms/Checkbox/Checkbox';
import { MouseEventHandler } from 'react';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import styles from './TimeReminder.module.css';
import SingleDropdownButton from '../../common/Dropdown/SingleDropdownButton';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
export enum TimeUnit {
  MINUTES = 'Minutes',
  HOURS = 'Hours',
  DAYS = 'Days',
}
export type TimeReminderProps = {
  sendReminders: MouseEventHandler;
  cardHeader: string;
  checkboxLabel: string;
  beforeLabel: string;
  timeUnit: TimeUnit;
  setTimeUnit: (value: TimeUnit) => void;
  reminder: boolean;
  setReminder: (value: boolean) => void;
  value: number;
  setValue: (newValue: number) => void;
};
const TimeReminder = ({
  sendReminders,
  cardHeader,
  checkboxLabel,
  beforeLabel,
  timeUnit,
  setTimeUnit,
  reminder,
  setReminder,
  value,
  setValue,
}: TimeReminderProps) => {
  const options: ValueLabelPair[] = [TimeUnit.MINUTES, TimeUnit.HOURS, TimeUnit.DAYS].map(
    (option: string) => new ValueLabelPair(option, option)
  );

  const handleNewTimeUnit = ({ value, _ }: any) => {
    setTimeUnit(value);
  };

  return (
    <Card title={cardHeader}>
      <Checkbox checked={reminder} setChecked={setReminder} label={checkboxLabel} />
      <div className={styles.timePickerContainer}>
        <div className={styles.amountInput}>
          <SingleValueInput valueHandler={setValue} value={value} type={'number'} minValue={0} />
        </div>
        <SingleDropdownButton
          options={options}
          onChange={handleNewTimeUnit}
          defaultValue={new ValueLabelPair(timeUnit, timeUnit)}
          className={styles.dropdownButton}
        />
        <div>{beforeLabel}</div>
      </div>
      <ActionButton
        onclick={sendReminders}
        text={reminder ? 'Save reminder' : 'Delete reminder'}
        className={styles.sendReminderButton}
      />
    </Card>
  );
};

export default TimeReminder;
