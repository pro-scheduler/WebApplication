import Col from 'react-bootstrap/Col';
import Card from '../common/Card/Card';
import styles from './SurveysList.module.css';
import SearchBox from '../common/forms/Input/SearchBox';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BasicUserSurveyInfo } from '../../model/survey/Survey';
import SurveyIcon from '../common/Icons/SurveyIcon';
import Timer from '../common/Timer/Timer';

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
        <td>{survey.description}</td>
        <td>{survey.organizer.username}</td>
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
    <>
      <Row className="justify-content-center mt-4 mr-5" style={{ marginLeft: '6%' }}>
        <Col lg={12} className="text-center mt-5">
          <SurveyIcon className={styles.surveyIcon} />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 ml-sm-5">
        <Col>
          <Card title="Your unfilled surveys">
            {surveys.length > 0 ? (
              <div className={styles.surveysTable}>
                <SearchBox value={searchTerm} onChange={handleChange} />
                <Table responsive="sm" className="mt-4">
                  <thead>
                    <tr>
                      <th>Meeting name</th>
                      <th>Survey description</th>
                      <th>Organizer</th>
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
        </Col>
      </Row>
    </>
  );
};
export default SurveysList;
