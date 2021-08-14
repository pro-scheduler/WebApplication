import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RedirectButton from '../common/SubmitButton/RedirectButton/RedirectButton';
import React, { useEffect, useState } from 'react';
import { Meeting } from '../../model/meeting/Meeting';
import styles from './MeetingList.module.css';
import Card from '../common/Card/Card';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router';

export type MeetingListProps = {
  header: string;
  noMeetingsInfo: string;
  meetings: Meeting[];
  showRedirectButton?: boolean;
};

const MeetingList = ({
  header,
  noMeetingsInfo,
  meetings,
  showRedirectButton = true,
}: MeetingListProps) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Meeting[]>(meetings);
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchResults(
      searchTerm !== ''
        ? meetings.filter((meeting: Meeting) =>
            meeting.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : meetings
    );
  }, [searchTerm, meetings]);

  const meetingRows = searchResults.map((meeting: Meeting, index: number) => {
    return (
      <tr
        key={index}
        onClick={() => history.push(`/meetings/${meeting.id}`)}
        className={styles.meetingRow}
      >
        <td>{meeting.name}</td>
        <td>{meeting.description}</td>
        <td>{meeting.type}</td>
      </tr>
    );
  });

  return (
    <Row className="justify-content-center mt-4 ml-sm-5">
      <Col>
        <Card title={header}>
          {meetings.length > 0 ? (
            <div className={styles.meetingsTable}>
              <SearchBox value={searchTerm} onChange={handleChange} />
              <Table responsive="sm" className="mt-4">
                <thead>
                  <tr>
                    <th>Meeting name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{meetingRows}</tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center mt-3">
              <div>{noMeetingsInfo}</div>
              {showRedirectButton && (
                <RedirectButton
                  className={styles.noMeetingButton}
                  redirectTO="/create"
                  text="Add new meeting"
                />
              )}
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default MeetingList;
