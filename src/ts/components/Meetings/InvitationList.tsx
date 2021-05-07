import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';
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
        <CalendarIcon className="meetingListIcon" />
      </Col>
      <Col lg={12} className="text-center my-3 meetingListHeader">
        {'Your invitations'}
      </Col>
      {invitations.length > 0 ? (
        <>{invitationCards}</>
      ) : (
        <div className="text-center mt-3">
          <div>{'You have not got any invitations'}</div>
        </div>
      )}
    </Row>
  );
};

export default InvitationList;
