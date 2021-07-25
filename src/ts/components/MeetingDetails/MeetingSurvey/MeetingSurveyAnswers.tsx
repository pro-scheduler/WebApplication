import Col from 'react-bootstrap/Col';
import AnswersPieChart from './AnswersPieChart';
import React from 'react';
import OpenAnswers from './OpenAnswers';
import { ChoiceInfo, SurveySummary } from '../../../model/survey/Survey';

export type MeetingSurveyResultsProps = {
  surveySummary: SurveySummary;
};

const MeetingSurveyAnswers = ({ surveySummary }: MeetingSurveyResultsProps) => {
  const charts = surveySummary.questionSummaries.map((questionSummary, index: number) => {
    if (questionSummary.entries)
      return (
        <AnswersPieChart
          key={index}
          data={questionSummary.entries}
          question={questionSummary.question}
          avg={questionSummary.avg}
          questionNumber={index + 1}
        />
      );
    else if (questionSummary.yes && questionSummary.no) {
      const data: ChoiceInfo[] = [
        { choice: 'Yes', info: { percentage: questionSummary.yes.percentage } },
        { choice: 'No', info: { percentage: questionSummary.no.percentage } },
      ];
      return (
        <AnswersPieChart
          key={index}
          data={data}
          question={questionSummary.question}
          questionNumber={index + 1}
        />
      );
    }
    return (
      <OpenAnswers
        key={index}
        data={questionSummary.answers ?? []}
        question={questionSummary.question}
        questionNumber={index + 1}
      />
    );
  });

  return (
    <Col className="mt-3">
      <div>{charts}</div>
    </Col>
  );
};

export default MeetingSurveyAnswers;
