import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './NameAndDesctiption.module.css';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import React, { useState } from 'react';
import { optionToValueLabelPair, ValueLabelPair } from '../../model/utils/ValueLabelPair';
import MultiValueInput from '../common/forms/Input/MultiValueInput';
import { RootStateOrAny, useSelector } from 'react-redux';
import allActions from '../../actions';
import FriendsIcon from '../common/Icons/FriendsIcon';

const CreateInvitations = () => {
  const [inputValue, setInputValue] = useState('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const invitations = useSelector((state: RootStateOrAny) => {
    return state.invitationReducer;
  });

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

  const clearData = () => {
    setEmails([]);
    setInputValue('');
  };

  const sendInvitations = () => {
    if (emails.length > 0) {
      allActions.invitationActions
        .createInvitations(invitations.meetingId, {
          emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        })
        .then(clearData);
    }
  };

  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <FriendsIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Invite participants</div>
      </Row>
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
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <ActionButton text="Invite" onclick={sendInvitations} className="button" />
        </Col>
      </Row>
    </div>
  );
};

export default CreateInvitations;
