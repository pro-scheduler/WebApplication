import { PlaceDetails } from '../../../../model/geo/Geo';
import styles from './MapWithPlaces.module.css';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { useEffect, useState } from 'react';
import MapToolTip from './MapToolTip/MapToolTip';

export type MapWithPlacesProps = {
  placesToDisplay: PlaceDetails[];
  disabled: boolean;
  setPlacesToDisplay?: Function;
  addNewPlace?: Function;
  mainButtonTooltipName: string;
  displayRemoveButton: boolean;
  displayMainButton: boolean;
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
}: MapWithPlacesProps) => {
  const [center, setCenter] = useState<[number, number]>([50.068074402115116, 19.912639700937756]);
  const [zoom, setZoom] = useState(11);
  const [colors, setColors] = useState<Colors>({});
  const [hidden, setHidden] = useState<Hidden>({});

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
    <div className={styles.mapContainer}>
      <Map
        height={500}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        defaultZoom={11}
        onClick={(e) => {
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
                console.log(place.id);
                let newColorProperties = resetProperties(setColors, 'var(--purple)');
                let newHiddenProperties = resetProperties(setHidden, true);
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
                  }}
                  mainButtonAction={() => {}}
                  removeButtonAction={() => {}}
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
  );
};

export default MapWithPlaces;
