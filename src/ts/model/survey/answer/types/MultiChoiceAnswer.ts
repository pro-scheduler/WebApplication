import { Type } from '../../question/Question';
import Answer from '../Answer';
import MultiChoiceQuestion from '../../question/types/MultiChoiceQuestion';

export default class MultiChoiceAnswer implements Answer {
  constructor(
    public id: number,
    public question: MultiChoiceQuestion,
    public choices: string[],
    public type: Type = Type.MULTI_CHOICE
  ) {}
}
