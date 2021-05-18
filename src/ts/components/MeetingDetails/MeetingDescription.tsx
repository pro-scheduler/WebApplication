import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './MeetingDescription.module.css';
import UserIcon from './UserIcon';
import { ProUser } from '../../model/user/ProUser';

export type MeetingDescriptionProps = {
  name: string;
  meetingId: number;
  organizers: ProUser[];
  description: string;
  link?: string;
};

const MeetingDescription = ({
  name,
  meetingId,
  organizers,
  description,
  link = '',
}: MeetingDescriptionProps) => {
  const organizersIcons = organizers.map((organizer: ProUser) => {
    return (
      <UserIcon
        name={organizer.email}
        meetingId={meetingId}
        userId={organizer.id}
        canDelete={false}
        key={'organizer' + organizer.id}
      />
    );
  });

  return (
    <Row className="justify-content mt-5 ml-5 pl-5">
      <Col lg={12} className={styles.meetingDescriptionName}>
        {name}
      </Col>
      <Col lg={12} className="mt-5">
        <div className={styles.meetingDescriptionOrganizer}>
          {organizers.length > 1 ? 'Organizers' : 'Organizer'}
        </div>
        {organizersIcons}
      </Col>
      <Col md={8} lg={6} xl={4} className="text-left mt-5">
        {description}
      </Col>
      <Col lg={12} className="text-left mt-5">
        {link}
      </Col>
    </Row>
  );
};

export default MeetingDescription;
