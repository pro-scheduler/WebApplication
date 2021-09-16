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
};

interface Colors {
  [key: number]: string;
}

const MapWithPlaces = ({
  placesToDisplay,
  setPlacesToDisplay,
  mainButtonTooltipName,
}: MapWithPlacesProps) => {
  const [center, setCenter] = useState<[number, number]>([50.068074402115116, 19.912639700937756]);
  const [zoom, setZoom] = useState(11);
  const [colors, setColors] = useState<Colors>({});

  const resetAllColors = () => {
    placesToDisplay.forEach((place) => {
      let newColors = { ...colors };
      newColors[place.id] = 'var(--purple)';
      setColors(newColors);
    });
  };
  const changeColor = (id: number, color: string) => {
    let newColors = { ...colors };
    newColors[id] = color;
    setColors(newColors);
  };

  useEffect(() => {
    resetAllColors();
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
          resetAllColors();
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
                changeColor(place.id, 'var(--red)');
              }}
            />
          );
        })}
        {placesToDisplay.map((place) => {
          //   console.log(
          //     (place.description.length + (place.address ? place.address.length + 9 : 0)) / 51
          //   );
          return (
            <Overlay
              key={place.id}
              anchor={[place.lat, place.long]}
              //   offset={[
              //     10,
              //     210 +
              //       (16 *
              //         (place.description.length + (place.address ? place.address.length + 9 : 0))) /
              //         51,
              //   ]}
              offset={[0, 0]}
            >
              <MapToolTip
                name={place.name}
                description={place.description}
                address={place.address}
                mainButtonName={mainButtonTooltipName}
                next={() => {}}
                mainButtonAction={() => {}}
                removeButtonAction={() => {}}
                closeAction={() => {}}
                displayNext={true}
                displayRemoveButton={true}
                displayMainButton={true}
              />
            </Overlay>
          );
        })}
      </Map>
    </div>
  );
};

export default MapWithPlaces;
