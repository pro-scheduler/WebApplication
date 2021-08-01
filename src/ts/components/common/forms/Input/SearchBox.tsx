import { ChangeEventHandler } from 'react';

export type SearchBoxProps = {
  value: string;
  onChange: ChangeEventHandler;
};

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return <input type={'text'} placeholder={'Search'} value={value} onChange={onChange} />;
};
export default SearchBox;
