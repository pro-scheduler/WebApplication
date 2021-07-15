import SingleValueInput from '../../components/common/forms/Input/SingleValueInput';
import styles from './Example.module.css';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import { useState } from 'react';
import { minSings, maxSings, required } from '../../tools/validator';
import TextArea from '../../components/common/forms/TextArea/TextArea';
import { Row, Col } from 'react-bootstrap';
import {
  toastDark,
  toastDefault,
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
} from '../../tools/messagesInvocator';

const ExampleValidation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  return (
    <div className={styles.example} style={{ padding: 30 }}>
      <SingleValueInput
        label="Name"
        valueHandler={setName}
        setInvalid={setInvalidName}
        validation={[
          { validation: minSings(5), message: 'Min 3 signs required' },
          { validation: minSings(5), message: 'Min 3 signs required' },
          { validation: required, message: 'This field is required' },
        ]}
      />
      <TextArea
        label="textAreaLabel"
        valueHandler={setDescription}
        required={true}
        setInvalid={setInvalidDescription}
        validation={[
          { validation: maxSings(256), message: 'Max 256 signs' },
          { validation: minSings(20), message: 'Min 20 signs' },
          { validation: required, message: 'This field is required' },
        ]}
      />
      <div style={{ margin: 20 }}>
        <ActionButton
          text="Submit"
          onclick={() => console.log('Action clicked')}
          className="button"
          disabled={
            invalidName || invalidDescription || !required()(name) || !required()(description)
          }
        />
      </div>
      <div style={{ margin: 20 }}>
        <h3>Messages</h3>
        <Row>
          <Col></Col>
          <Col>
            <div
              role="button"
              onClick={() => toastSuccess('This is an example massage')}
              style={{
                width: 200,
                height: 40,
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'var(--purple)',
              }}
            >
              Success
            </div>
            <br></br>
            <div
              role="button"
              onClick={() => toastError('This is an example massage')}
              style={{
                width: 200,
                height: 40,
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'var(--purple)',
              }}
            >
              Error
            </div>
            <br></br>
            <div
              role="button"
              onClick={() => toastDark('This is an example massage')}
              style={{
                width: 200,
                height: 40,
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'var(--purple)',
              }}
            >
              Dark
            </div>
            <br></br>
            <div
              role="button"
              onClick={() => toastDefault('This is an example massage')}
              style={{
                width: 200,
                height: 40,
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'var(--purple)',
              }}
            >
              Success
            </div>
            <br></br>
            <div
              role="button"
              onClick={() => toastInfo('This is an example massage')}
              style={{
                width: 200,
                height: 40,
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'var(--purple)',
              }}
            >
              Info
            </div>
            <br></br>
            <div
              role="button"
              onClick={() => toastWarning('This is an example massage')}
              style={{
                width: 200,
                height: 40,
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'var(--purple)',
              }}
            >
              Warning{' '}
            </div>
            <br></br>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};

export default ExampleValidation;
