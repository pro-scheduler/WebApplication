import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './NameAndDesctiption.module.css';
import { useState } from 'react';
import { optionToValueLabelPair, ValueLabelPair } from '../../model/utils/ValueLabelPair';
import MultiValueInput from '../common/forms/Input/MultiValueInput';
import FriendsIcon from '../common/Icons/FriendsIcon';

export type CreateInvitationsProps = {
  showIcon: boolean;
  emails: ValueLabelPair[];
  setEmails: (newEmails: ValueLabelPair[]) => void;
};

const CreateInvitations = ({ showIcon, emails, setEmails }: CreateInvitationsProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (event: any) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const email = optionToValueLabelPair(inputValue);
        if (
          emails.filter((valueLabelPair: ValueLabelPair) => valueLabelPair.value === email.value)
            .length === 0
        ) {
          setEmails([...emails, email]);
        }
        setInputValue('');
        event.preventDefault();
    }
  };

  return (
    <div>
      {showIcon && (
        <>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <FriendsIcon />
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <div className={style.createHeader}>Invite participants</div>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-4">
        <Col />
        <Col xs={8} lg={6}>
          <MultiValueInput
            inputValue={inputValue}
            value={emails}
            handleChange={setEmails}
            handleInputChange={setInputValue}
            handleKeyDown={handleKeyDown}
            placeholder={'Type email and press enter ...'}
          />
        </Col>
        <Col />
      </Row>
    </div>
  );
};

export default CreateInvitations;
