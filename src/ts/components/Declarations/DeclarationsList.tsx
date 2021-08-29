import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import styles from './DeclarationsList.module.css';
import Card from '../common/Card/Card';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import { DeclarationDetails } from '../../model/declaration/Declaration';

export type DeclarationsListProps = {
  declarations: DeclarationDetails[];
};

const DeclarationsList = ({ declarations }: DeclarationsListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DeclarationDetails[]>(declarations);
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

  const declarationsRows = searchResults.map((delcaration: DeclarationDetails, index: number) => {
    return (
      <tr key={index}>
        <td>{delcaration.meetingId}</td>
        <td>{delcaration.title}</td>
        <td>{delcaration.description}</td>
      </tr>
    );
  });

  return (
    <Row className="justify-content-center mt-4 ml-sm-5">
      <Col>
        <Card title="Your declarations">
          {declarations.length > 0 && (
            <div className={styles.declarationsTable}>
              <SearchBox value={searchTerm} onChange={handleChange} />
              <Table responsive="sm" className="mt-4">
                <thead>
                  <tr>
                    <th>Meeting id</th>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>{declarationsRows}</tbody>
              </Table>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default DeclarationsList;
