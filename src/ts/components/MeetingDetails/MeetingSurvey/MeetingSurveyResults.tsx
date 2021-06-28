import Col from 'react-bootstrap/Col';
import AnswersPieChart from './AnswersPieChart';
import Row from 'react-bootstrap/Row';
import React from 'react';
import TotalPieChart from './TotalPieChart';
import OpenAnswers from './OpenAnswers';
import { ChoiceInfo, SurveySummary } from '../../../model/survey/Survey';
import LineWithHeader from '../LineWithHeader';

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
    <Row className="justify-content my-5 ml-5 pl-5">
      <Col lg={12}>
        <LineWithHeader header={'Survey Results'} />
      </Col>
      <Col lg={5} className="text-center mx-auto mt-3">
        <TotalPieChart
          filled={surveySummary.finishedParticipantsCount}
          total={numberOfParticipants}
        />
        {charts}
      </Col>
    </Row>
  );
};

export default MeetingSurveyResults;
