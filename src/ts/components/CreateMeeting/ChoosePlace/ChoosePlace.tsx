import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import SearchGeocoder from '../../common/Map/SearchGeocoder/SearchGeocoder';
import styles from './ChoosePlace.module.css';
export type ChoosePlaceProps = {
  isOnlineMeeting: boolean;
  state: string;
};

const ChoosePlace = ({ isOnlineMeeting, state }: ChoosePlaceProps) => {
  const [selectedPlace, setSeletedPlace] = useState<string>('');

  //TODO modifie adding by search when api will be ready
  useEffect(() => {
    if (selectedPlace !== '') {
      console.log('Add new palce', selectedPlace);
    }
  }, [selectedPlace]);

  return (
    <div hidden={isOnlineMeeting || state !== 'place'} className={styles.choosePlaceContainer}>
      <Row className="justify-content-center mt-4 ml-sm-5">
        <div className={styles.searchContainer}>
          <SearchGeocoder setSelectedPlace={setSeletedPlace} />
        </div>
      </Row>
    </div>
  );
};

export default ChoosePlace;
