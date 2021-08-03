import { ChangeEventHandler } from 'react';
import styles from './SearchBox.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export type SearchBoxProps = {
  value: string;
  onChange: ChangeEventHandler;
};

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className={styles.searchContainer}>
      <AiOutlineSearch className={styles.searchIcon} />
      <input
        type={'text'}
        placeholder={'Search ...'}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};
export default SearchBox;
