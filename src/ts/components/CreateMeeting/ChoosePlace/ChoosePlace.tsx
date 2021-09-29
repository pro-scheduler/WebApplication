import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlaceDetails, PlaceDTO } from '../../../model/geo/Geo';
import MapIcon from '../../common/Icons/MapIcon';
import MapWithPlaces from '../../common/Map/MapWithPlaces/MapWithPlaces';
import SearchGeocoder from '../../common/Map/SearchGeocoder/SearchGeocoder';
import styles from './ChoosePlace.module.css';
import PlacesTable from './PlacesTable/PlacesTable';
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
    <div hidden={isOnlineMeeting || !(state === 'place' || state === 'summary')}>
      {state !== 'summary' ? (
        <Row className="justify-content-center mt-4">
          <h5>Add new place by searching or clicking on the map</h5>
        </Row>
      ) : (
        <>
          <Row className="justify-content-center mt-5">
            <Col lg={12} className="text-center">
              <MapIcon />
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <div className={styles.createHeader}>Meeting place details</div>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-4" hidden={state === 'summary'}>
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
      <Row className="justify-content-center mt-4">
        <Col>
          <div className={styles.mapContainer}>
            <MapWithPlaces
              disabled={false}
              placesToDisplay={newPlaces}
              setPlacesToDisplay={setNewPlaces}
              mainButtonTooltipNameMapper={() => ''}
              displayMainButton={false}
              displayRemoveButton={true}
              mainButtonAction={() => {}}
              allowAdding={true}
              addPlaceAction={(place: PlaceDetails) => {
                setNewPlaces([...newPlaces, place]);
              }}
              removeButtonAction={(id: number) => {
                setNewPlaces(newPlaces.filter((p) => p.id !== id));
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4" hidden={state === 'summary'}>
        <Col>
          <PlacesTable
            places={newPlaces}
            setSelectedPlaces={setNewPlaces}
            emptyText="You didn't select any place"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePlace;
