import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlaceDetails, PlaceDTO } from '../../../model/geo/Geo';
import MapIcon from '../../common/Icons/MapIcon';
import AddPlacePopup from '../../common/Map/MapWithPlaces/AddPlacePopup/AddPlacePopup';
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
  const [newPlaces, setNewPlaces] = useState<PlaceDetails[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [searchPropositionPlace, setSearchPropositionPlace] = useState<PlaceDetails>({
    id: -1,
    latitude: 0,
    longitude: 0,
    name: '',
    description: '',
    address: '',
    votes: [],
  });
  useEffect(() => {
    setSelectedPlaces(newPlaces);
  }, [newPlaces, setSelectedPlaces]);

  return (
    <>
      <div
        hidden={
          isOnlineMeeting || (state !== 'place' && (state !== 'summary' || newPlaces.length === 0))
        }
      >
        <Row className="justify-content-center mt-5">
          <Col lg={12} className="text-center">
            <MapIcon />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <div className={styles.createHeader}>Select possible meeting places</div>
        </Row>
        <Row className="justify-content-center mt-4" hidden={state === 'summary'}>
          <div className={styles.searchContainer}>
            <SearchGeocoder
              setSelectedPlace={(newPlace: PlaceDTO) => {
                let place = {
                  ...newPlace,
                  id: Math.random() * 1000,
                  votes: [],
                };
                setNewPlaces([...newPlaces, place]);
                setTimeout(() => {
                  setOpenPopup(true);
                  setSearchPropositionPlace(place);
                }, 1200);
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
      <AddPlacePopup
        defaultAddress={searchPropositionPlace.address}
        defaultDescription={searchPropositionPlace.description}
        defaultName={searchPropositionPlace.name}
        onClose={() => {
          setNewPlaces(newPlaces.filter((place) => place.id !== searchPropositionPlace.id));
        }}
        setShow={setOpenPopup}
        display={openPopup}
        addNewPlace={(details: { name: string; address: string; description: string }) => {
          setNewPlaces([
            ...newPlaces.filter((place) => place.id !== searchPropositionPlace.id),
            {
              ...searchPropositionPlace,
              name: details.name,
              address: details.address,
              description: details.description,
            },
          ]);
        }}
      />
    </>
  );
};

export default ChoosePlace;
