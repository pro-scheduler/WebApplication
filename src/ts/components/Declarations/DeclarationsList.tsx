import React, { useEffect, useState } from 'react';
import styles from './DeclarationsList.module.css';
import Card from '../common/Card/Card';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import { DeclarationDetails } from '../../model/declaration/Declaration';
import { useHistory } from 'react-router';
import UserNameIcon from '../common/Icons/UserNameIcon';
import { UserSummary } from '../../model/user/ProUser';

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
        <td>{declaration.meetingName}</td>
        <td>{declaration.title}</td>
        <td>
          <UserNameIcon
            user={declaration.createdBy}
            email={declaration.createdBy.email}
            showEmail={false}
          />
        </td>
        <td>
          <div style={{ position: 'relative' }}>
            {declaration.assignees.slice(0, 5).map((assignee: UserSummary, index: number) => (
              <div key={assignee.id} style={{ left: index * 25, position: 'absolute' }}>
                <UserNameIcon user={assignee} email={assignee.email} showEmail={false} />
              </div>
            ))}
          </div>
        </td>
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
                <th>Meeting name</th>
                <th>Title</th>
                <th>Created by</th>
                <th>People assigned</th>
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
