import { PlaceDetails, PlaceDTO } from '../../../../model/geo/Geo';
import styles from './MapWithPlaces.module.css';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { useEffect, useState } from 'react';
import MapToolTip from './MapToolTip/MapToolTip';
import ActionButton from '../../SubmitButton/ActionButton/ActionButton';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import { geocodeByLocation } from '../../../../API/geo/geo';

export type MapWithPlacesProps = {
  placesToDisplay: PlaceDetails[];
  disabled: boolean;
  setPlacesToDisplay?: Function;
  mainButtonTooltipName: string;
  displayRemoveButton: boolean;
  displayMainButton: boolean;
  mainButtonAction: Function;
  allowAdding: boolean;
};

interface Colors {
  [key: number]: string;
}
interface Hidden {
  [key: number]: boolean;
}

const defaultProposals = { address: '', description: '', name: '' };
const MapWithPlaces = ({
  placesToDisplay,
  setPlacesToDisplay,
  mainButtonTooltipName,
  displayRemoveButton,
  displayMainButton,
  mainButtonAction,
  allowAdding,
}: MapWithPlacesProps) => {
  const [center, setCenter] = useState<[number, number]>([50.068074402115116, 19.912639700937756]);
  const [zoom, setZoom] = useState(11);
  const [colors, setColors] = useState<Colors>({});
  const [hidden, setHidden] = useState<Hidden>({});
  const [newCoordinates, setNewCoordinates] = useState<[number, number]>([0, 0]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [insertingMode, setInsertingMode] = useState<boolean>(false);

  const [proposalDetails, setProposalDetails] = useState<{
    address: string;
    description: string;
    name: string;
  }>(defaultProposals);
  const resetProperties = (setter: Function, value: any) => {
    let newProperties: any = {};
    placesToDisplay.forEach((place) => {
      newProperties[place.id] = value;
    });
    setter(newProperties);
    return newProperties;
  };
  const changeProperty = (id: number, setter: Function, old: any, value: any) => {
    let newProperty = { ...old };
    newProperty[id] = value;
    setter(newProperty);
    return newProperty;
  };
  const mapWidthToZoom = (width: number) => {
    if (width <= 0.0014) return 18;
    if (width <= 0.003) return 17;
    if (width <= 0.0059) return 16;
    if (width <= 0.0118) return 15;
    if (width <= 0.027) return 14;
    if (width <= 0.52) return 13;
    if (width <= 0.1) return 12;
    if (width <= 0.21) return 11;
    if (width <= 0.4) return 10;
    if (width <= 0.8) return 9;
    if (width <= 1.6) return 8;
    if (width <= 3.0) return 7;
    if (width <= 6.0) return 6;
    if (width <= 11.0) return 5;
    if (width <= 20.0) return 4;
    if (width <= 45) return 3;
    return 2;
  };
  //calculate center and zoom to obatin all places
  useEffect(() => {
    if (placesToDisplay.length > 0) {
      let latAvg =
        placesToDisplay.map((p) => p.lat).reduce((a, b) => a + b, 0) / placesToDisplay.length;
      let longAvg =
        placesToDisplay.map((p) => p.long).reduce((a, b) => a + b, 0) / placesToDisplay.length;
      let width =
        Math.max.apply(
          null,
          placesToDisplay.map((p) => p.lat)
        ) -
        Math.min.apply(
          null,
          placesToDisplay.map((p) => p.lat)
        );
      let height =
        Math.max.apply(
          null,
          placesToDisplay.map((p) => p.long)
        ) -
        Math.min.apply(
          null,
          placesToDisplay.map((p) => p.long)
        );
      setCenter([latAvg, longAvg]);
      setZoom(mapWidthToZoom(width > height ? width : height));
    }
    // eslint-disable-next-line
  }, [placesToDisplay]);

  useEffect(() => {
    resetProperties(setColors, 'var(--purple)');
    resetProperties(setHidden, true);
    // eslint-disable-next-line
  }, [placesToDisplay]);

  return (
    <>
      <div
        className={styles.mapContainer}
        style={{
          cursor: insertingMode ? 'pointer' : 'default',
          opacity: insertingMode ? 0.8 : 1,
        }}
      >
        <Map
          height={500}
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
          defaultZoom={11}
          onClick={(cords) => {
            if (insertingMode) {
              setNewCoordinates(cords.latLng);
              setShowPopup(true);
              setInsertingMode(false);
              geocodeByLocation(cords.latLng[0], cords.latLng[1], (places: PlaceDTO[]) => {
                if (places.length > 0) {
                  setProposalDetails({
                    address: places[0].address,
                    name: places[0].name,
                    description: places[0].description,
                  });
                }
              });
            }
            resetProperties(setColors, 'var(--purple)');
            resetProperties(setHidden, true);
          }}
        >
          <ZoomControl />
          {placesToDisplay.map((place) => {
            return (
              <Marker
                key={place.id}
                width={60}
                anchor={[place.lat, place.long]}
                color={colors[place.id]}
                onClick={() => {
                  let newColorProperties = resetProperties(setColors, 'var(--purple)');
                  let newHiddenProperties = resetProperties(setHidden, true);
                  if (hidden[place.id]) {
                    setZoom(15);
                    setCenter([place.lat, place.long]);
                  }
                  changeProperty(
                    place.id,
                    setColors,
                    newColorProperties,
                    colors[place.id] === 'var(--red)' ? 'var(--purple)' : 'var(--red)'
                  );
                  changeProperty(place.id, setHidden, newHiddenProperties, !hidden[place.id]);
                }}
              />
            );
          })}
          {placesToDisplay.map((place, i) => {
            return (
              <Overlay key={place.id} anchor={[place.lat, place.long]} offset={[0, 0]}>
                <div hidden={hidden[place.id]}>
                  <MapToolTip
                    name={place.name}
                    description={place.description}
                    address={place.address}
                    mainButtonName={mainButtonTooltipName}
                    next={() => {
                      let nextPlaceIndex = (i + 1) % placesToDisplay.length;
                      let nextPlace = placesToDisplay[nextPlaceIndex];
                      let newHidden = changeProperty(place.id, setHidden, hidden, true);
                      let newColor = changeProperty(place.id, setColors, colors, 'var(--purple)');
                      changeProperty(nextPlace.id, setHidden, newHidden, false);
                      changeProperty(nextPlace.id, setColors, newColor, 'var(--red)');
                      setCenter([nextPlace.lat, nextPlace.long]);
                      setZoom(15);
                    }}
                    mainButtonAction={mainButtonAction}
                    removeButtonAction={() => {
                      if (setPlacesToDisplay)
                        setPlacesToDisplay(placesToDisplay.filter((p) => p.id !== place.id));
                    }}
                    closeAction={() => {
                      changeProperty(place.id, setHidden, hidden, true);
                      changeProperty(place.id, setColors, colors, 'var(--purple)');
                    }}
                    displayNext={placesToDisplay.length > 1}
                    displayRemoveButton={displayRemoveButton}
                    displayMainButton={displayMainButton}
                  />
                </div>
              </Overlay>
            );
          })}
        </Map>
      </div>
      <div className={styles.insertModelButton}>
        {allowAdding && (
          <ActionButton
            text="Add marker"
            onclick={() => {
              setInsertingMode(true);
            }}
          />
        )}
      </div>
      <AddPlacePopup
        defaultAddress={proposalDetails.address}
        defaultDescription={proposalDetails.description}
        defaultName={proposalDetails.name}
        setShow={setShowPopup}
        display={showPopup}
        addNewPlace={(details: { name: string; address: string; descrption: string }) => {
          if (setPlacesToDisplay) {
            setPlacesToDisplay([
              ...placesToDisplay,
              {
                ...details,
                id: placesToDisplay.length,
                lat: newCoordinates[0],
                long: newCoordinates[1],
              },
            ]);
          }
        }}
      />
    </>
  );
};

export default MapWithPlaces;
