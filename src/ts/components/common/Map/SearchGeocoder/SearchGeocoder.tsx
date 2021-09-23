import { FunctionComponent, useEffect, useState } from 'react';
import { geocodeByText } from '../../../../API/geo/geo';
import { PlaceDTO } from '../../../../model/geo/Geo';
import SingleValueInput from '../../forms/Input/SingleValueInput';
import ActionButton from '../../SubmitButton/ActionButton/ActionButton';
import styles from './SearchGeocoder.module.css';

export type SearchGeocoderProps = {
  setSelectedPlace: Function;
};

const SearchGeocoder: FunctionComponent<SearchGeocoderProps> = ({ setSelectedPlace }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [newPlace, setNewPlace] = useState<PlaceDTO | undefined>(undefined);
  const [propositions, setPropositions] = useState<PlaceDTO[]>([]);

  useEffect(() => {
    if (searchText === '') {
      setPropositions([]);
    } else {
      geocodeByText(searchText, setPropositions);
    }
  }, [searchText]);

  const addProposition = (proposition: PlaceDTO) => {
    setSearchText(proposition.name);
    setPropositions([]);
    setNewPlace(proposition);
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
