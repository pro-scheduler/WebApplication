import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../common/Icons/PencilIcon';
import styles from './NameAndDesctiption.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';
import { minSings, maxSings, required } from '../../tools/validator';
import Card from '../../components/common/Card/Card';
import React from 'react';

export type NameAndDescriptionProps = {
  visible: boolean;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setInvalidNameDesc: (invalid: boolean) => void;
};

const NameAndDescription = ({
  visible,
  setName,
  setDescription,
  setInvalidNameDesc,
}: NameAndDescriptionProps) => {
  return (
    <div className={visible ? '' : styles.hidden}>
      <Row className="justify-content-center mt-5">
        <Col lg={12} className="text-center">
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
              placeholder="Please type meeting name ..."
            />
          </Card>
          <Card title={'Meeting description'}>
            <TextArea
              valueHandler={setDescription}
              setInvalid={setInvalidNameDesc}
              validation={[{ validation: maxSings(500), message: 'Max 500 signs' }]}
              placeholder="Please type meeting description ..."
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NameAndDescription;
