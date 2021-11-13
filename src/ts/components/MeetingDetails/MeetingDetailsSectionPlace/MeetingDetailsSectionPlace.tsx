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
  finalPlaceId: number;
  setFinalPlace: Function;
  canSeeVotingResults?: boolean;
};

const MeetingDetailsSectionPlace = ({
  meeting,
  isOrganizer,
  user,
  places,
  onPlacesChange,
  finalPlaceId,
  setFinalPlace,
  canSeeVotingResults = false,
}: MeetingDetailsSectionPlaceProps) => {
  useEffect(() => {}, []);

  return (
    <Row className="justify-content mb-5">
      <Col lg={12}>
        <MeetingPlaces
          meetingId={meeting.id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
          places={places}
          setPlaces={onPlacesChange}
          finalPlaceId={finalPlaceId}
          setFinalPlace={setFinalPlace}
          canSeeVotingResults={canSeeVotingResults}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionPlace;
