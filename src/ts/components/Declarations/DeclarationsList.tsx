import React, { useEffect, useState } from 'react';
import styles from './DeclarationsList.module.css';
import Card from '../common/Card/Card';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import { DeclarationDetails } from '../../model/declaration/Declaration';
import { useHistory } from 'react-router';

export type DeclarationsListProps = {
  declarations: DeclarationDetails[];
};

const DeclarationsList = ({ declarations }: DeclarationsListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DeclarationDetails[]>(declarations);
  const history = useHistory();
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchResults(
      searchTerm !== ''
        ? declarations.filter((declarations: DeclarationDetails) =>
            declarations.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : declarations
    );
  }, [searchTerm, declarations]);

  const declarationsRows = searchResults.map((declaration: DeclarationDetails, index: number) => {
    return (
      <tr
        onClick={() => history.push(`/meetings/${declaration.meetingId}`)}
        key={index}
        className={styles.declarationRow}
      >
        <td>{declaration.title}</td>
        <td>{declaration.description}</td>
        <td>{declaration.createdBy.email}</td>
      </tr>
    );
  });

  return (
    <Card title="Your declarations">
      {declarations.length > 0 ? (
        <div className={styles.declarationsTable}>
          <SearchBox value={searchTerm} onChange={handleChange} />
          <Table responsive="sm" className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Created by</th>
              </tr>
            </thead>
            <tbody>{declarationsRows}</tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center mt-3">
          <div>You don't have any declarations</div>
        </div>
      )}
    </Card>
  );
};

export default DeclarationsList;
