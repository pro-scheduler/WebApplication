import Card from '../common/Card/Card';
import styles from './SurveysList.module.css';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BasicUserSurveyInfo } from '../../model/survey/Survey';
import Timer from '../common/Timer/Timer';
import { UserSummary } from '../../model/user/ProUser';
import UserNameIcon from '../common/Icons/UserNameIcon';

export type SurveysListProps = {
  surveys: BasicUserSurveyInfo[];
};
const SurveysList = ({ surveys }: SurveysListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BasicUserSurveyInfo[]>(surveys);
  const history = useHistory();
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchResults(
      searchTerm !== ''
        ? surveys.filter((survey: BasicUserSurveyInfo) =>
            survey.meetingName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : surveys
    );
  }, [searchTerm, surveys]);

  const surveysRows = searchResults.map((survey: BasicUserSurveyInfo, index: number) => {
    return (
      <tr
        onClick={() => history.push(`/meetings/${survey.meetingId}`)}
        key={index}
        className={styles.surveyRow}
      >
        <td>{survey.meetingName}</td>
        <td>
          <div style={{ position: 'relative' }}>
            {survey.organizers.slice(0, 5).map((organizer: UserSummary, index: number) => (
              <div key={organizer.id} style={{ left: index * 25, position: 'absolute' }}>
                <UserNameIcon user={organizer} email={organizer.username} showEmail={false} />
              </div>
            ))}
          </div>
        </td>
        <td>
          <Timer
            date={survey.surveyEndDate}
            completedMessage={'Closed'}
            noEndDateMessage={'No time limit'}
          />
        </td>
        <td>{survey.questionsCount}</td>
      </tr>
    );
  });

  return (
    <Card title="Your unfilled surveys">
      {surveys.length > 0 ? (
        <div className={styles.surveysTable}>
          <SearchBox value={searchTerm} onChange={handleChange} />
          <Table responsive="sm" className="mt-4">
            <thead>
              <tr>
                <th>Meeting name</th>
                <th>Organizers</th>
                <th>Time left</th>
                <th>Number of questions</th>
              </tr>
            </thead>
            <tbody>{surveysRows}</tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center mt-3">
          <div>You don't have any unfilled surveys</div>
        </div>
      )}
    </Card>
  );
};
export default SurveysList;
