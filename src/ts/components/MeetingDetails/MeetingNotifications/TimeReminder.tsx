import Card from '../../common/Card/Card';
import Checkbox from '../../common/forms/Checkbox/Checkbox';
import { MouseEventHandler } from 'react';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import styles from './TimeReminder.module.css';
import SingleDropdownButton from '../../common/Dropdown/SingleDropdownButton';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { ReminderInfo, TimeUnit } from '../../../model/notification/Notification';

export type TimeReminderProps = {
  sendReminders: MouseEventHandler;
  cardHeader: string;
  checkboxLabel: string;
  beforeLabel: string;
  reminderInfo: ReminderInfo;
  setReminderInfo: (value: ReminderInfo) => void;
};

const TimeReminder = ({
  sendReminders,
  cardHeader,
  checkboxLabel,
  beforeLabel,
  reminderInfo,
  setReminderInfo,
}: TimeReminderProps) => {
  const options: ValueLabelPair[] = [TimeUnit.MINUTES, TimeUnit.HOURS, TimeUnit.DAYS].map(
    (option: string) => new ValueLabelPair(option, option)
  );

  const handleNewTimeUnit = ({ value, _ }: any) => {
    setReminderInfo({ ...reminderInfo, timeUnit: value });
  };

  const setSendReminder = (value: boolean) => {
    setReminderInfo({ ...reminderInfo, sendReminder: value });
  };

  const setReminderValue = (value: number) => {
    setReminderInfo({ ...reminderInfo, value: value });
  };

  return (
    <Card title={cardHeader}>
      <Checkbox
        checked={reminderInfo.sendReminder}
        setChecked={setSendReminder}
        label={checkboxLabel}
      />
      <div className={styles.timePickerContainer}>
        <div className={styles.amountInput}>
          <SingleValueInput
            valueHandler={setReminderValue}
            value={reminderInfo.value}
            type={'number'}
            minValue={0}
          />
        </div>
        <SingleDropdownButton
          options={options}
          onChange={handleNewTimeUnit}
          value={new ValueLabelPair(reminderInfo.timeUnit, reminderInfo.timeUnit)}
          className={styles.dropdownButton}
        />
        <div>{beforeLabel}</div>
      </div>
      <ActionButton
        onclick={sendReminders}
        text={reminderInfo.sendReminder ? 'Save reminder' : 'Delete reminder'}
        className={styles.sendReminderButton}
      />
    </Card>
  );
};

export default TimeReminder;
