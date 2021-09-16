import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlaceDetails } from '../../../model/geo/Geo';
import MapWithPlaces from '../../common/Map/MapWithPlaces/MapWithPlaces';
import SearchGeocoder from '../../common/Map/SearchGeocoder/SearchGeocoder';
import styles from './ChoosePlace.module.css';
export type ChoosePlaceProps = {
  isOnlineMeeting: boolean;
  state: string;
};

const ChoosePlace = ({ isOnlineMeeting, state }: ChoosePlaceProps) => {
  const [selectedPlace, setSeletedPlace] = useState<string>('');
  const [selectedPlaces, setSelectedPlaces] = useState<PlaceDetails[]>([
    {
      id: 0,
      lat: 50.068074402115116,
      long: 19.912639700937756,
      name: 'Katedra Informatki AGH',
      description: 'Nasz ulubione miejsce',
      address: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie, 30-001 Kraków',
    },
    {
      id: 1,
      lat: 50.061781852877736,
      long: 19.93740285479882,
      name: 'Rynek główny',
      description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
      address: '',
    },
    {
      id: 2,
      lat: 50.061781852877736,
      long: 19.92740285479882,
      name: 'Rynek główny',
      description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
      address: '',
    },
  ]);
  //TODO modifie adding by search when api will be ready
  useEffect(() => {
    if (selectedPlace !== '') {
      console.log('Add new palce', selectedPlace);
    }
  }, [selectedPlace]);

  return (
    <div hidden={isOnlineMeeting || state !== 'place'} className={styles.choosePlaceContainer}>
      <Row className="justify-content-center mt-4">
        <h5>Add new place by searching or clicking on the map</h5>
      </Row>
      <Row className="justify-content-center mt-4 ml-sm-5">
        <div className={styles.searchContainer}>
          <SearchGeocoder setSelectedPlace={setSeletedPlace} />
        </div>
      </Row>
      <Row>
        <Col>
          <div className={styles.mapContainer}>
            <MapWithPlaces
              disabled={false}
              placesToDisplay={selectedPlaces}
              setPlacesToDisplay={setSelectedPlaces}
              mainButtonTooltipName={'Vote for that place'}
              displayMainButton={false}
              displayRemoveButton={true}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePlace;
