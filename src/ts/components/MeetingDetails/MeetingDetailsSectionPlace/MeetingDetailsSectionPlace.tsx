import { useEffect } from 'react';
import styles from './MeetingDetailsSectionPlace.module.css';
import { MeetingDetails, MeetingState } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingPlaces from '../MeetingPlaces/MeetingPlaces';
import { UserSummary } from '../../../model/user/ProUser';
import { PlaceDetails } from '../../../model/geo/Geo';
import { MeetingPlacesChangeFunction } from '../../../views/MeetingDetails/MeetingDetails';

export type MeetingDetailsSectionPlaceProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  user: UserSummary;
  places: PlaceDetails[];
  onPlacesChange: MeetingPlacesChangeFunction;
};

const MeetingDetailsSectionPlace = ({
  meeting,
  isOrganizer,
  user,
  places,
  onPlacesChange,
}: MeetingDetailsSectionPlaceProps) => {
  useEffect(() => {}, []);

  return (
    <Row className="justify-content">
      <Col lg={12}>
        <MeetingPlaces
          meetingId={meeting.id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
          places={places}
          setPlaces={onPlacesChange}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionPlace;
