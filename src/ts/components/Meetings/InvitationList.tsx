import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EnvelopIcon from '../common/Icons/EnvelopIcon';
import React from 'react';
import './MeetingList.css';
import { BasicInvitationInfo } from '../../model/invitation/InvitationDTO';
import InvitationCard from './InvitationCard';

interface InvitationsList {
  invitations: BasicInvitationInfo[];
}

const InvitationList = ({ invitations }: InvitationsList) => {
  const invitationCards = invitations.map((invitation: BasicInvitationInfo) => {
    return <InvitationCard key={invitation.basicMeetingDetailsDTO.id} {...invitation} />;
  });

  return (
    <Row className="justify-content-center mt-4 mr-5 meetingListRow">
      <Col lg={12} className="text-center mt-5">
        <EnvelopIcon className="meetingListIcon" />
      </Col>
      <Col lg={12} className="text-center my-3 meetingListHeader">
        {'Your invitations'}
      </Col>
      {invitationCards}
    </Row>
  );
};

export default InvitationList;
