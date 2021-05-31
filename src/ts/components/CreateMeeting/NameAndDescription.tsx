import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../common/Icons/PencilIcon';
import style from './NameAndDesctiption.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';
import { minSings, maxSings, required } from '../../tools/validator';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';

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
    <div className={state !== 'name' && state !== 'summary' ? style.hidden : ''}>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <PencilIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Describe Meeting</div>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col />
        <Col xs="auto">
          <SingleValueInput
            label="Name"
            valueHandler={setName}
            setInvalid={setInvalidNameDesc}
            required={true}
            validation={[
              { validation: required, message: 'This field is required' },
              { validation: minSings(5), message: 'Min 5 signs' },
              { validation: maxSings(255), message: 'Max 255 signs' },
            ]}
          />
          <div className="mt-4">
            <TextArea
              label="Description"
              valueHandler={setDescription}
              setInvalid={setInvalidNameDesc}
              validation={[{ validation: maxSings(500), message: 'Max 500 signs' }]}
            />
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};

export default NameAndDescription;
