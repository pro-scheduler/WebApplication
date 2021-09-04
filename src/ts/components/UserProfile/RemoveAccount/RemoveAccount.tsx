import { UserSummary } from '../../../model/user/ProUser';
import Card from '../../common/Card/Card';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import { useState } from 'react';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import styles from './RemoveAccount.module.css';

const RemoveAccount = ({ user }: { user: UserSummary }) => {
  const [email, setEmail] = useState<string>('');

  const removeAccount = () => {
    // TODO connect with API
  };

  return (
    <Card title="Remove your account">
      <div>Type your email to remove your account. Remember, this operation cannot be undone!</div>
      <div className={styles.inputButtonContainer}>
        <div className={styles.emailInput}>
          <SingleValueInput
            valueHandler={setEmail}
            value={email}
            placeholder={'Type your email here ...'}
          />
        </div>
        <ActionButton
          onclick={removeAccount}
          text={'Remove account'}
          className={styles.removeAccountButton}
          disabled={user.email !== email}
        />
      </div>
    </Card>
  );
};

export default RemoveAccount;
