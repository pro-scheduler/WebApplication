import Card from '../../common/Card/Card';
import Checkbox from '../../common/forms/Checkbox/Checkbox';
import { useState } from 'react';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import styles from './MeetingReminder.module.css';
import SingleDropdownButton from '../../common/Dropdown/SingleDropdownButton';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';

const MeetingReminder = () => {
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
    <Card title="Meeting reminder">
      <Checkbox
        checked={reminder}
        setChecked={setReminder}
        label={'Send reminder about the meeting to all participants'}
      />
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
        <div>before the meeting starts</div>
      </div>
    </Card>
  );
};

export default MeetingReminder;
