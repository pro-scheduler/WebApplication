import { useEffect, useState } from 'react';
import { MeetingDetails, MeetingModuleType, MeetingState } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingPlaces from '../MeetingPlaces/MeetingPlaces';
import { UserSummary } from '../../../model/user/ProUser';
import { PlaceDetails } from '../../../model/geo/Geo';
import { getMeetingPlaces } from '../../../API/geo/geo';

export type MeetingDetailsSectionPlaceProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  user: UserSummary;
  finalPlaceId: number;
  setFinalPlace: Function;
  canSeeVotingResults?: boolean;
};

const MeetingDetailsSectionPlace = ({
  meeting,
  isOrganizer,
  user,
  finalPlaceId,
  setFinalPlace,
  canSeeVotingResults = false,
}: MeetingDetailsSectionPlaceProps) => {
  const [places, setPlaces] = useState<PlaceDetails[]>([]);

  useEffect(() => {
    if (meeting.availableModules.includes(MeetingModuleType.PLACE_VOTING)) {
      getMeetingPlaces(meeting.id, setPlaces);
    }
  }, [meeting]);

  return (
    <Row className="justify-content mb-5">
      <Col lg={12}>
        <MeetingPlaces
          meetingId={meeting.id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
          places={places}
          setPlaces={(updatedPlaces: PlaceDetails[]) => setPlaces(updatedPlaces)}
          finalPlaceId={finalPlaceId}
          setFinalPlace={setFinalPlace}
          canSeeVotingResults={canSeeVotingResults}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionPlace;
