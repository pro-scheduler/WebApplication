import AnswersPieChart from './AnswersPieChart';
import React from 'react';
import OpenAnswers from './OpenAnswers';
import { ChoiceInfo, SurveySummary } from '../../../model/survey/Survey';

export type MeetingSurveyResultsProps = {
  surveySummary: SurveySummary;
};

const MeetingSurveyAnswers = ({ surveySummary }: MeetingSurveyResultsProps) => {
  const charts = surveySummary.questionSummaries
    .sort((a, b) => (a.questionId > b.questionId ? 1 : -1))
    .map((questionSummary, index: number) => {
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

  return <div>{charts}</div>;
};

export default MeetingSurveyAnswers;
