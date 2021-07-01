import Col from 'react-bootstrap/Col';
import AnswersPieChart from './AnswersPieChart';
import React from 'react';
import TotalPieChart from './TotalPieChart';
import OpenAnswers from './OpenAnswers';
import { ChoiceInfo, SurveySummary } from '../../../model/survey/Survey';

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

  return (
    <Col lg={5} className="text-center mx-auto mt-5">
      <TotalPieChart
        filled={surveySummary.finishedParticipantsCount}
        total={numberOfParticipants}
      />
      {charts}
    </Col>
  );
};

export default MeetingSurveyResults;
