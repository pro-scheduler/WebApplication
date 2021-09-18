import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlaceDetails, PlaceDTO } from '../../../model/geo/Geo';
import MapIcon from '../../common/Icons/MapIcon';
import MapWithPlaces from '../../common/Map/MapWithPlaces/MapWithPlaces';
import SearchGeocoder from '../../common/Map/SearchGeocoder/SearchGeocoder';
import styles from './ChoosePlace.module.css';
export type ChoosePlaceProps = {
  isOnlineMeeting: boolean;
  state: string;
  setSelectedPlaces: Function;
};

const ChoosePlace = ({ isOnlineMeeting, state, setSelectedPlaces }: ChoosePlaceProps) => {
  const [newPlaces, setNewPlaces] = useState<PlaceDetails[]>(
    [
      {
        lat: 50.068074402115116,
        long: 19.912639700937756,
        name: 'Katedra Informatki AGH',
        description: 'Nasz ulubione miejsce',
        address: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie, 30-001 Kraków',
      },
      {
        lat: 50.061781852877736,
        long: 19.93740285479882,
        name: 'Rynek główny',
        description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
        address: '',
      },
      {
        lat: 50.061781852877736,
        long: 19.92740285479882,
        name: 'Rynek główny',
        description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
        address: '',
      },
    ].map((place, i) => {
      return { ...place, id: i, votes: [] };
    })
  );

  useEffect(() => {
    setSelectedPlaces(newPlaces);
  }, [newPlaces, setSelectedPlaces]);

  return (
    <div
      hidden={isOnlineMeeting || !(state === 'place' || state === 'summary')}
      className={styles.choosePlaceContainer}
    >
      {state !== 'summary' ? (
        <Row className="justify-content-center mt-4">
          <h5>Add new place by searching or clicking on the map</h5>
        </Row>
      ) : (
        <>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <MapIcon />
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <div className={styles.createHeader}>Selected palces</div>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-4 ml-sm-5">
        <div className={styles.searchContainer}>
          <SearchGeocoder
            setSelectedPlace={(newPlace: PlaceDTO) => {
              setNewPlaces([
                ...newPlaces,
                {
                  ...newPlace,
                  id: Math.random() * 1000,
                  votes: [],
                },
              ]);
            }}
          />
        </div>
      </Row>
      <Row>
        <Col>
          <div className={styles.mapContainer}>
            <MapWithPlaces
              disabled={false}
              placesToDisplay={newPlaces}
              setPlacesToDisplay={setNewPlaces}
              mainButtonTooltipName={'Vote for that place'}
              displayMainButton={false}
              displayRemoveButton={true}
              mainButtonAction={() => {}}
              allowAdding={true}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePlace;
