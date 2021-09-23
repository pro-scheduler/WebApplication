import styles from './MeetingPlaces.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Collapse } from 'react-collapse';
import LineWithHeader from '../LineWithHeader';
import { PlaceDetails } from '../../../model/geo/Geo';
import {
  addNewPlace,
  deletePlace,
  getMeetingPlaces,
  updatePlaces,
  updateVotes,
  voteBackForPlace,
  voteForPlace,
} from '../../../API/geo/geo';
import { UserSummary } from '../../../model/user/ProUser';
import MapWithPlaces from '../../common/Map/MapWithPlaces/MapWithPlaces';
import Card from '../../common/Card/Card';
import SquareCheckbox from '../../common/forms/SquareCheckbox/SquareCheckbox';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import PlacesBarChart from './PlacesBarChart/PlacesBarChart';
import PlacesTable from '../../CreateMeeting/ChoosePlace/PlacesTable/PlacesTable';

export type MeetingPlacesProps = {
  meetingId: number;
  user: UserSummary;
  isOrganizer: boolean;
  open: boolean;
};

const MeetingPlaces = ({ meetingId, user, isOrganizer }: MeetingPlacesProps) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [myVotes, setMyVotes] = useState<number[]>([]);
  const [newVotes, setNewVotes] = useState<number[]>([]);
  const [newPlaces, setNewPlaces] = useState<PlaceDetails[]>([]);

  const tooltipMapping = useCallback(
    (placeId: number) =>
      places.some((place) => place.id === placeId && place.votes.some((u) => (u.id = user.id)))
        ? 'Back your vote'
        : 'Vote for that place',
    [places, user]
  );

  useEffect(() => {
    if (meetingId) {
      getMeetingPlaces(meetingId, setPlaces);
    }
  }, [meetingId]);

  useEffect(() => {
    setNewPlaces(places);
  }, [places]);

  useEffect(() => {
    if (places) {
      setMyVotes(
        places
          .filter((place) => place.votes.some((usr) => usr.id === user.id))
          .map((place) => place.id)
      );
    }
  }, [places, user]);

  useEffect(() => {
    setNewVotes(myVotes);
  }, [myVotes]);

  const sendNewVotes = () => {
    updateVotes(meetingId, newVotes, setPlaces);
  };

  const toggleVote = (placeId: number) => {
    if (places.some((place) => place.id === placeId && place.votes.some((u) => u.id === user.id))) {
      voteBackForPlace(placeId, (placeDetails: PlaceDetails) => {
        setPlaces([...places.filter((p) => p.id !== placeDetails.id), placeDetails]);
      });
    } else {
      voteForPlace(placeId, (placeDetails: PlaceDetails) => {
        setPlaces([...places.filter((p) => p.id !== placeDetails.id), placeDetails]);
      });
    }
  };

  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <LineWithHeader header={'Places'} collapseAction={setOpened} />
      <Col lg={12}>
        <Collapse isOpened={opened}>
          <div className={styles.mapContainer}>
            <MapWithPlaces
              disabled={!isOrganizer}
              placesToDisplay={places}
              setPlacesToDisplay={setPlaces}
              mainButtonTooltipNameMapper={tooltipMapping}
              displayMainButton={true}
              displayRemoveButton={true}
              mainButtonAction={(placeId: number) => {
                toggleVote(placeId);
              }}
              removeButtonAction={(placeId: number) => {
                deletePlace(placeId, () => {
                  setPlaces(places.filter((place: PlaceDetails) => place.id !== placeId));
                });
              }}
              allowAdding={true}
              addPlaceAction={(place: PlaceDetails) => {
                addNewPlace(
                  {
                    name: place.name,
                    description: place.description,
                    address: place.address,
                    lat: place.lat,
                    long: place.long,
                  },
                  (place: PlaceDetails) => setPlaces([...places, place]),
                  meetingId
                );
              }}
            />
          </div>
        </Collapse>
      </Col>
      <Col lg={6}>
        <Card
          title="Your votes"
          miniCard={false}
          footer={
            <div className={styles.buttonContainer}>
              <ActionButton
                onclick={sendNewVotes}
                text={'Edit my votes'}
                disabled={
                  newVotes.every((p) => myVotes.includes(p)) &&
                  myVotes.every((p) => newVotes.includes(p))
                }
              />
            </div>
          }
        >
          {places.map((place, i) => (
            <div key={i}>
              <div className={styles.checkboxInline}>
                <SquareCheckbox
                  checked={newVotes.includes(place.id)}
                  setChecked={(check) => {
                    if (!check) setNewVotes(newVotes.filter((id) => id !== place.id));
                    else setNewVotes([...newVotes, place.id]);
                  }}
                />
              </div>
              {place.name}
            </div>
          ))}
        </Card>
      </Col>
      <Col lg={6} className={styles.barchart}>
        <Card title="Voting results" miniCard={false}>
          <PlacesBarChart placesToDisplay={places} />
        </Card>
      </Col>
      {isOrganizer && (
        <Col>
          <PlacesTable
            places={newPlaces}
            setSelectedPlaces={(newPlaces: PlaceDetails[]) => {
              updatePlaces(newPlaces, meetingId, setPlaces);
            }}
            emptyText={'Meeting has no places'}
          />
        </Col>
      )}
    </Row>
  );
};
export default MeetingPlaces;
