import { getSurveyUrl } from './urls';
import Survey from '../../model/survey/Survey';

export const fetchSurveyWithId = (surveyId: number) => {
  return fetch(getSurveyUrl(surveyId))
    .then((response: Response) => response.json())
    .then((survey: Survey) => {
      return survey;
    });
};
