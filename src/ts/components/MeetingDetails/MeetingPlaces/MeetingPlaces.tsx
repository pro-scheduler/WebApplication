import styles from './MeetingPlaces.module.css';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Collapse } from 'react-collapse';
import LineWithHeader from '../LineWithHeader';
import { PlaceDetails } from '../../../model/geo/Geo';
import { getMeetingPlaces } from '../../../API/geo/geo';
import { UserSummary } from '../../../model/user/ProUser';
import MapWithPlaces from '../../common/Map/MapWithPlaces/MapWithPlaces';
import Card from '../../common/Card/Card';
import SquareCheckbox from '../../common/forms/SquareCheckbox/SquareCheckbox';

export type MeetingPlacesProps = {
  meetingId: number;
  user: UserSummary;
  isOrganizer: boolean;
  open: boolean;
};

const MeetingPlaces = ({ meetingId, user, isOrganizer }: MeetingPlacesProps) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);

  useEffect(() => {
    if (meetingId) {
      getMeetingPlaces(meetingId, setPlaces);
    }
  }, [meetingId]);

  return (
    <Row className="justify-content ml-5 pl-5">
      <LineWithHeader header={'Places'} collapseAction={setOpened} />
      <Col>
        <Collapse isOpened={opened}>
          <div className={styles.mapContainer}>
            <MapWithPlaces
              disabled={isOrganizer}
              placesToDisplay={places}
              setPlacesToDisplay={setPlaces}
              mainButtonTooltipName={'Vote for that place'}
              displayMainButton={true}
              displayRemoveButton={isOrganizer}
              mainButtonAction={() => {}}
              allowAdding={isOrganizer}
            />
          </div>
          <Row className="justify-content pl-5 pr-5">
            <Col lg={6} style={{ padding: 0 }}>
              <Card title="Your votes" miniCard={true}>
                {places.map((place, i) => (
                  <div key={i}>
                    <div className={styles.checkboxInline}>
                      <SquareCheckbox
                        checked={place.votes.some((usr) => usr.id === user.id)}
                        setChecked={() => {}}
                      />
                    </div>
                    {place.name}
                  </div>
                ))}
              </Card>
            </Col>
            <Col lg={6} style={{ padding: 0 }}>
              <Card title="Voting results" miniCard={true}>
                sdf
              </Card>
            </Col>
          </Row>
        </Collapse>
      </Col>
    </Row>
  );
};
export default MeetingPlaces;
