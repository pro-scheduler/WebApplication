import RedirectButton from '../common/SubmitButton/RedirectButton/RedirectButton';
import React, { useEffect, useState } from 'react';
import { MeetingSummary } from '../../model/meeting/Meeting';
import styles from './MeetingList.module.css';
import Card from '../common/Card/Card';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import DeleteButton from '../common/SubmitButton/ActionButton/DeleteButton';
import { leaveMeeting } from '../../API/meeting/meetingService';
import { UserSummary } from '../../model/user/ProUser';
import UserNameIcon from '../common/Icons/UserNameIcon';

export type MeetingListProps = {
  header: string;
  noMeetingsInfo: string;
  meetings: MeetingSummary[];
  showRedirectButton?: boolean;
  refreshMeetings?: Function;
};

const MeetingList = ({
  header,
  noMeetingsInfo,
  meetings,
  showRedirectButton = true,
  refreshMeetings,
}: MeetingListProps) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MeetingSummary[]>(meetings);
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchResults(
      searchTerm !== ''
        ? meetings.filter((meeting: MeetingSummary) =>
            meeting.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : meetings
    );
  }, [searchTerm, meetings]);

  const meetingRows = searchResults.map((meeting: MeetingSummary, index: number) => {
    return (
      <tr key={index} className={styles.meetingRow}>
        <td onClick={() => history.push(`/meetings/${meeting.id}`)}>{meeting.name}</td>
        <td onClick={() => history.push(`/meetings/${meeting.id}`)}>{meeting.description}</td>
        <td onClick={() => history.push(`/meetings/${meeting.id}`)}>
          <div style={{ position: 'relative' }}>
            {meeting.organizers.slice(0, 5).map((organizer: UserSummary, index: number) => (
              <div key={organizer.id} style={{ left: index * 25, position: 'absolute' }}>
                <UserNameIcon user={organizer} email={organizer.username} showEmail={false} />
              </div>
            ))}
          </div>
        </td>
        <td onClick={() => history.push(`/meetings/${meeting.id}`)}>
          {meeting.finalDate?.timeStart && meeting.finalDate.timeEnd
            ? new Date(meeting.finalDate.timeStart).toLocaleString('en-US', {
                hour: 'numeric',
                hour12: false,
                minute: 'numeric',
              }) +
              ' - ' +
              new Date(meeting.finalDate.timeEnd).toLocaleString('en-US', {
                hour: 'numeric',
                hour12: false,
                minute: 'numeric',
              }) +
              ', ' +
              (new Date(meeting.finalDate.timeStart).toLocaleDateString() ===
              new Date(meeting.finalDate.timeEnd).toLocaleDateString()
                ? new Date(meeting.finalDate.timeStart).toLocaleDateString()
                : new Date(meeting.finalDate.timeStart).toLocaleDateString() +
                  ' - ' +
                  new Date(meeting.finalDate.timeEnd).toLocaleDateString())
            : '-'}
        </td>
        <td onClick={() => history.push(`/meetings/${meeting.id}`)}>{meeting.state}</td>
        {refreshMeetings && (
          <td>
            <DeleteButton onDelete={() => leaveMeeting(meeting.id, refreshMeetings)} />
          </td>
        )}
      </tr>
    );
  });

  return (
    <Card title={header}>
      {meetings.length > 0 ? (
        <div className={styles.meetingsTable}>
          <SearchBox value={searchTerm} onChange={handleChange} />
          <Table responsive="sm" className="mt-4">
            <thead>
              <tr>
                <th>Meeting name</th>
                <th>Description</th>
                <th>Organizers</th>
                <th>Date</th>
                <th>State</th>
                <th />
              </tr>
            </thead>
            <tbody>{meetingRows}</tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center">
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
  );
};

export default MeetingList;
