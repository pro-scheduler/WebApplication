import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../common/Icons/PencilIcon';
import styles from './NameAndDesctiption.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';
import { minSings, maxSings, required } from '../../tools/validator';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import Card from '../../components/common/Card/Card';

export type NameAndDescriptionProps = {
  state: creatingMeetingState;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setInvalidNameDesc: (invalid: boolean) => void;
};

const NameAndDescription = ({
  state,
  setName,
  setDescription,
  setInvalidNameDesc,
}: NameAndDescriptionProps) => {
  return (
    <div className={state !== 'name' && state !== 'summary' ? styles.hidden : ''}>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <PencilIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.createHeader}>Describe Meeting</div>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col>
          <Card title={'Meeting name *'}>
            <SingleValueInput
              valueHandler={setName}
              setInvalid={setInvalidNameDesc}
              validation={[
                { validation: required, message: 'This field is required' },
                { validation: minSings(5), message: 'Min 5 signs' },
                { validation: maxSings(255), message: 'Max 255 signs' },
              ]}
              placeholder="Please type meeting name..."
            />
          </Card>
          <Card title={'Meeting description'}>
            <div className="mt-4">
              <TextArea
                valueHandler={setDescription}
                setInvalid={setInvalidNameDesc}
                validation={[{ validation: maxSings(500), message: 'Max 500 signs' }]}
                placeholder="Please type meeting description..."
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NameAndDescription;
