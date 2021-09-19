import { useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { PlaceDetails, PlaceDTO } from '../../../../model/geo/Geo';
import Card from '../../../common/Card/Card';
import SquareCheckbox from '../../../common/forms/SquareCheckbox/SquareCheckbox';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import styles from './PlacesTable.module.css';
export type PlacesTableProps = {
  places: PlaceDetails[];
  hidden: boolean;
  setSelectedPlaces: Function;
  emptyText: string;
};

const PlacesTable = ({ hidden, places, setSelectedPlaces, emptyText }: PlacesTableProps) => {
  const [checkedPlaces, setCheckedPlaces] = useState<number[]>([]);

  const placesRows = places.map((place: PlaceDTO, index: number) => {
    return (
      <tr key={index}>
        <td>
          <SquareCheckbox
            checked={checkedPlaces.includes(index)}
            setChecked={(state) => {
              if (state) setCheckedPlaces([...checkedPlaces, index]);
              else setCheckedPlaces(checkedPlaces.filter((place) => place !== index));
            }}
          />
        </td>
        <td>{place.name}</td>
        <td>{place.description}</td>
        <td>{place.address}</td>
      </tr>
    );
  });

  return (
    <Row className="justify-content-center mt-4 ml-sm-5" hidden={hidden}>
      <Col>
        <Card
          title="Selected places"
          displayTopHr={false}
          footer={
            <div className={styles.buttonContainer}>
              <ActionButton
                onclick={() => {
                  setSelectedPlaces(places.filter((_, i) => !checkedPlaces.includes(i)));
                  setCheckedPlaces([]);
                }}
                text={'Remove places'}
                disabled={checkedPlaces.length === 0}
              />
            </div>
          }
        >
          {places.length > 0 ? (
            <div className={styles.placesTable}>
              <Table responsive="sm" className="mt-4">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>{placesRows}</tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center mt-3">
              <div>{emptyText}</div>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default PlacesTable;
