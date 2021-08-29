import Card from '../../common/Card/Card';
import Checkbox from '../../common/forms/Checkbox/Checkbox';
import { MouseEventHandler, useState } from 'react';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import styles from './TimeReminder.module.css';
import SingleDropdownButton from '../../common/Dropdown/SingleDropdownButton';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';

export type TimeReminderProps = {
  sendReminders: MouseEventHandler;
  cardHeader: string;
  checkboxLabel: string;
  beforeLabel: string;
};
const TimeReminder = ({
  sendReminders,
  cardHeader,
  checkboxLabel,
  beforeLabel,
}: TimeReminderProps) => {
  // TODO get settings from backend and send new settings
  const [reminder, setReminder] = useState<boolean>(false);
  const [value, setValue] = useState<number>(15);
  // eslint-disable-next-line
  const [timeUnit, setTimeUnit] = useState<'Minutes' | 'Hours' | 'Days'>('Hours');
  const options: ValueLabelPair[] = ['Minutes', 'Hours', 'Days'].map(
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
          defaultValue={options[0]}
          className={styles.dropdownButton}
        />
        <div>{beforeLabel}</div>
      </div>
      <ActionButton
        onclick={sendReminders}
        text={'Save reminder'}
        className={styles.sendReminderButton}
      />
    </Card>
  );
};

export default TimeReminder;
