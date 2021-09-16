import { FunctionComponent, useEffect, useState } from 'react';
import SingleValueInput from '../../forms/Input/SingleValueInput';
import ActionButton from '../../SubmitButton/ActionButton/ActionButton';
import styles from './SearchGeocoder.module.css';

export type SearchGeocoderProps = {
  setSelectedPlace: Function;
};

const mockedPropositions = [
  'Ramen People Kraków ul. Długa 42',
  'Tauron Arena Kraków ul. Krakowska 1',
  'Kebab Kraków ul. Krótka 3',
  'MacDOnald Kraków ul. średnio długa 23',
  'Dworzec Główny Kraków ul. kosciuszkowska 5',
  'Jezioro Kraków ul. Long 5a',
  'Park Kraków ul. Short 32',
];
const SearchGeocoder: FunctionComponent<SearchGeocoderProps> = ({ setSelectedPlace }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [propositions, setPropositions] = useState<string[]>([]);

  //TODO api call here (when geocoding will be done)
  useEffect(() => {
    if (searchText === '') {
      setPropositions([]);
    } else {
      setTimeout(() => {
        setPropositions(mockedPropositions.filter((_) => Math.random() < 0.5));
      }, 500);
    }
  }, [searchText]);

  const addProposition = (proposition: string) => {
    setSearchText(proposition);
    setTimeout(() => {
      setPropositions([]);
    }, 1000);
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
            setSelectedPlace(searchText);
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
          {proposition}
        </div>
      ))}
    </div>
  );
};

export default SearchGeocoder;
