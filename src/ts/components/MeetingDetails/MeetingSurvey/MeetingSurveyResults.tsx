import Col from 'react-bootstrap/Col';
import AnswersPieChart from './AnswersPieChart';
import React from 'react';
import TotalPieChart from './TotalPieChart';
import OpenAnswers from './OpenAnswers';
import { ChoiceInfo, SurveySummary } from '../../../model/survey/Survey';
import UserNameIcon from '../../common/Icons/UserNameIcon';

export type MeetingSurveyResultsProps = {
  surveySummary: SurveySummary;
  numberOfParticipants: number;
};

const MeetingSurveyResults = ({
  surveySummary,
  numberOfParticipants,
}: MeetingSurveyResultsProps) => {
  const charts = surveySummary.questionSummaries.map((questionSummary, index: number) => {
    if (questionSummary.entries)
      return (
        <AnswersPieChart
          key={index}
          data={questionSummary.entries}
          question={questionSummary.question}
          avg={questionSummary.avg}
        />
      );
    else if (questionSummary.yes && questionSummary.no) {
      const data: ChoiceInfo[] = [
        { choice: 'Yes', info: { percentage: questionSummary.yes.percentage } },
        { choice: 'No', info: { percentage: questionSummary.no.percentage } },
      ];
      return <AnswersPieChart key={index} data={data} question={questionSummary.question} />;
    }
    return (
      <OpenAnswers
        key={index}
        data={questionSummary.answers ?? []}
        question={questionSummary.question}
      />
    );
  });

  const emails = surveySummary.users.map((email: string, index: number) => (
    <Col lg={3} className="my-1 mx-auto text-center" key={index}>
      <UserNameIcon email={email} key={index} />
    </Col>
  ));

  return (
    <>
      <Col lg={5} className="text-center mx-auto mt-5">
        <p>
          Survey completed by {surveySummary.finishedParticipantsCount}{' '}
          {surveySummary.finishedParticipantsCount === 1 ? 'participant' : 'participants'}
        </p>
      </Col>
      <Col lg={12} />
      {emails}
      <Col lg={12} />
      <Col lg={5} className="text-center mx-auto mt-5">
        <TotalPieChart
          filled={surveySummary.finishedParticipantsCount}
          total={numberOfParticipants}
        />
        {charts}
      </Col>
    </>
  );
};

export default MeetingSurveyResults;
