import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../common/Icons/PencilIcon';
import style from './NameAndDesctiption.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';

export type NameAndDescriptionProps = {
  setName: (name: string) => void;
  setDescription: (description: string) => void;
};

const NameAndDescription = ({ setName, setDescription }: NameAndDescriptionProps) => {
  return (
    <div>
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
          <SingleValueInput label="Name" valueHandler={setName} />
          <div className="mt-4">
            <TextArea label="Description" valueHandler={setDescription} />
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};

export default NameAndDescription;
