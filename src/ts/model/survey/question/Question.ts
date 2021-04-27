import OpenQuestion from './types/OpenQuestion';
import MultiChoiceQuestion from './types/MultiChoiceQuestion';
import YesOrNoQuestion from './types/YesOrNoQuestion';
import DropdownQuestion from './types/DropdownQuestion';
import LinearScaleQuestion from './types/LinearScaleQuestion';

export default interface Question {
  id: number;
  question: string;
  type: Type;
}

export enum Type {
  OPEN = 'OPEN',
  MULTI_CHOICE = 'MULTI_CHOICE',
  YES_OR_NO = 'YES_OR_NO',
  DROPDOWN = 'DROPDOWN',
  LINEAR_SCALE = 'LINEAR_SCALE',
}

export const getQuestionFromJson = (question: any): Question | undefined => {
  switch (question.type) {
    case Type.OPEN:
      return new OpenQuestion(question.id, question.question);
    case Type.MULTI_CHOICE:
      return new MultiChoiceQuestion(question.id, question.question, question.possibleChoices);
    case Type.YES_OR_NO:
      return new YesOrNoQuestion(question.id, question.question);
    case Type.DROPDOWN:
      return new DropdownQuestion(question.id, question.question, question.possibleChoices);
    case Type.LINEAR_SCALE:
      return new LinearScaleQuestion(
        question.id,
        question.question,
        question.fromValue,
        question.toValue
      );
    default:
      return undefined;
  }
};
