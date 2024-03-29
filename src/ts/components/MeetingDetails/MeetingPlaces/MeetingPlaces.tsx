import styles from './MeetingPlaces.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlaceDetails, PlacesSettings } from '../../../model/geo/Geo';
import {
  addNewPlace,
  deletePlace,
  getPlacesSettings,
  saveFinalPlace,
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
  places: PlaceDetails[];
  setPlaces: Function;
  finalPlaceId: number;
  setFinalPlace: Function;
  canSeeVotingResults: boolean;
};

const MeetingPlaces = ({
  meetingId,
  user,
  isOrganizer,
  open,
  places,
  setPlaces,
  finalPlaceId,
  setFinalPlace,
  canSeeVotingResults,
}: MeetingPlacesProps) => {
  const [myVotes, setMyVotes] = useState<number[]>([]);
  const [newVotes, setNewVotes] = useState<number[]>([]);
  const [placesSettings, setPlacesSettings] = useState<PlacesSettings>({
    onlyOrganizerCanAddPlaceToMeeting: false,
  });
  const barChartDivRef = useRef<HTMLDivElement>(null);
  const tooltipMapping = useCallback(
    (placeId: number) =>
      places.some((place) => place.id === placeId && place.votes.some((u) => u.id === user.id))
        ? 'Back my vote'
        : 'Vote for that place',
    [places, user]
  );
  const disabledFinalPlaceButtonMapper = useCallback(
    (placeId: number) => placeId === finalPlaceId,
    [finalPlaceId]
  );

  useEffect(() => {
    getPlacesSettings(meetingId, setPlacesSettings);
  }, [meetingId]);

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
    <Row className="justify-content">
      <Col lg={12}>
        <div className={styles.mapContainer}>
          <MapWithPlaces
            disabled={(!isOrganizer && placesSettings.onlyOrganizerCanAddPlaceToMeeting) || !open}
            placesToDisplay={places}
            mainButtonTooltipNameMapper={tooltipMapping}
            displayMainButton={open}
            displayRemoveButton={
              (isOrganizer || !placesSettings.onlyOrganizerCanAddPlaceToMeeting) && open
            }
            mainButtonAction={(placeId: number) => {
              toggleVote(placeId);
            }}
            removeButtonAction={(placeId: number) => {
              deletePlace(placeId, () => {
                setPlaces(places.filter((place: PlaceDetails) => place.id !== placeId));
              });
            }}
            allowAdding={(isOrganizer || !placesSettings.onlyOrganizerCanAddPlaceToMeeting) && open}
            addPlaceAction={(place: PlaceDetails) => {
              addNewPlace(
                {
                  name: place.name,
                  description: place.description,
                  address: place.address,
                  latitude: place.latitude,
                  longitude: place.longitude,
                },
                setPlaces,
                meetingId
              );
            }}
            displayFinalPlaceButton={isOrganizer && open}
            disabledFinalPlaceButtonMapper={disabledFinalPlaceButtonMapper}
            finalPlaceAction={(placeId: number) => {
              saveFinalPlace(meetingId, placeId, () => {
                setFinalPlace(places.find((p) => p.id === placeId));
              });
            }}
            finalPlaceId={finalPlaceId}
            showLegend={true}
          />
        </div>
      </Col>
      <Col lg={6}>
        <Card
          title="Your votes"
          miniCard={false}
          footer={
            open ? (
              <div className={styles.buttonContainer}>
                <ActionButton
                  onclick={sendNewVotes}
                  text={myVotes.length === 0 ? 'Save my votes' : 'Edit my votes'}
                  disabled={
                    newVotes.every((p) => myVotes.includes(p)) &&
                    myVotes.every((p) => newVotes.includes(p))
                  }
                  className={styles.editButton}
                />
              </div>
            ) : undefined
          }
        >
          <div
            className={styles.votesContainer}
            style={{
              height: barChartDivRef.current ? barChartDivRef.current.clientHeight - 79 : 'auto',
            }}
          >
            {places.map((place, i) => (
              <div key={i}>
                <div className={styles.checkboxInline}>
                  <SquareCheckbox
                    checked={newVotes.includes(place.id)}
                    setChecked={
                      open
                        ? (check) => {
                            if (!check) setNewVotes(newVotes.filter((id) => id !== place.id));
                            else setNewVotes([...newVotes, place.id]);
                          }
                        : () => {}
                    }
                  />
                </div>
                {place.name}
              </div>
            ))}
          </div>
        </Card>
      </Col>
      {canSeeVotingResults && (
        <Col lg={6} className={styles.barchart}>
          <Card title="Voting results" miniCard={false}>
            <div ref={barChartDivRef}>
              <PlacesBarChart placesToDisplay={places} />
            </div>
          </Card>
        </Col>
      )}
      {(isOrganizer || !placesSettings.onlyOrganizerCanAddPlaceToMeeting) && open && (
        <Col>
          <PlacesTable
            places={places}
            setSelectedPlaces={(newPlaces: PlaceDetails[]) => {
              updatePlaces(newPlaces, meetingId, setPlaces);
            }}
            emptyText={'Meeting has no places'}
            displayFinalPlaceButton={false}
            disabledFinalPlaceButtonMapper={disabledFinalPlaceButtonMapper}
            finalPlaceAction={(placeId: number) => {
              saveFinalPlace(meetingId, placeId, () => {
                setFinalPlace(places.find((p) => p.id === placeId));
              });
            }}
            finalPlace={finalPlaceId}
          />
        </Col>
      )}
    </Row>
  );
};
export default MeetingPlaces;
