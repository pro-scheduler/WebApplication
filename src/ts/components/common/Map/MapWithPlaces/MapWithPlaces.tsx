import { PlaceDetails } from '../../../../model/geo/Geo';
import styles from './MapWithPlaces.module.css';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { useEffect, useState } from 'react';
import MapToolTip from './MapToolTip/MapToolTip';
import ActionButton from '../../SubmitButton/ActionButton/ActionButton';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';

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
        //TODO autofill here when geodocing will be ready (lat, long) => (name, address,de scription)
        defaultAddress={''}
        defaultDescription={''}
        defaultName={''}
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
