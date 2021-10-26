import { FunctionComponent, useEffect, useState } from 'react';
import { geocodeByText } from '../../../../API/geo/geo';
import { SearchResult } from '../../../../model/geo/Geo';
import SingleValueInput from '../../forms/Input/SingleValueInput';
import styles from './SearchGeocoder.module.css';

export type SearchGeocoderProps = {
  setSelectedPlace: Function;
};

const SearchGeocoder: FunctionComponent<SearchGeocoderProps> = ({ setSelectedPlace }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [propositions, setPropositions] = useState<SearchResult[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const timoutTime = 500;

  useEffect(() => {
    setIsTyping(true);
    if (searchText !== '') {
      let tiemout = setTimeout(() => {
        setIsTyping(false);
      }, timoutTime);

      return () => {
        clearTimeout(tiemout);
      };
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText === '') {
      setPropositions([]);
    } else {
      if (!isTyping) {
        geocodeByText(searchText, setPropositions);
        setIsTyping(true);
      }
    }
  }, [searchText, isTyping]);

  const addProposition = (proposition: SearchResult) => {
    setSearchText('');
    setPropositions([]);
    let address =
      (proposition.address.road ? proposition.address.road : '') +
      ' ' +
      (proposition.address.city ? proposition.address.city : '') +
      ' ' +
      (proposition.address.postcode ? proposition.address.postcode : '') +
      ' ' +
      (proposition.address.country ? proposition.address.country : '');
    setSelectedPlace({
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
