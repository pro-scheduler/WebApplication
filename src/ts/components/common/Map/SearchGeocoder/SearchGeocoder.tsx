import { FunctionComponent, useEffect, useState } from 'react';
import { geocodeByText } from '../../../../API/geo/geo';
import { PlaceDTO, SearchResult } from '../../../../model/geo/Geo';
import SingleValueInput from '../../forms/Input/SingleValueInput';
import ActionButton from '../../SubmitButton/ActionButton/ActionButton';
import styles from './SearchGeocoder.module.css';

export type SearchGeocoderProps = {
  setSelectedPlace: Function;
};

const SearchGeocoder: FunctionComponent<SearchGeocoderProps> = ({ setSelectedPlace }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [newPlace, setNewPlace] = useState<PlaceDTO | undefined>(undefined);
  const [propositions, setPropositions] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchText === '') {
      setPropositions([]);
    } else {
      geocodeByText(searchText, setPropositions);
    }
  }, [searchText]);

  const addProposition = (proposition: SearchResult) => {
    setSearchText(proposition.name);
    setPropositions([]);
    let address =
      (proposition.address.road ? proposition.address.road : '') +
      ' ' +
      (proposition.address.city ? proposition.address.city : '') +
      ' ' +
      (proposition.address.postcode ? proposition.address.postcode : '') +
      ' ' +
      (proposition.address.country ? proposition.address.country : '');
    setNewPlace({
      latitude: parseFloat(proposition.lat),
      longitude: parseFloat(proposition.lon),
      name: address,
      description: proposition.name,
      address: address,
    });
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <SingleValueInput
          valueHandler={setSearchText}
          placeholder={'search...'}
          value={searchText}
          className={styles.customInput}
        />
        <ActionButton
          text="Add"
          className={styles.addButton}
          onclick={() => {
            setSelectedPlace(newPlace);
            setSearchText('');
          }}
          disabled={searchText === ''}
        />
      </div>
      {propositions.map((proposition, i) => (
        <div
          key={i}
          className={styles.listProposition}
          onClick={() => {
            addProposition(proposition);
          }}
        >
          {proposition.name}
        </div>
      ))}
    </div>
  );
};

export default SearchGeocoder;
