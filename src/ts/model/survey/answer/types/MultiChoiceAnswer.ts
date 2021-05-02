import { Type } from '../../question/Question';
import Answer from '../Answer';
import MultiChoiceQuestion from '../../question/types/MultiChoiceQuestion';

export default class MultiChoiceAnswer implements Answer {
  constructor(
    public question: MultiChoiceQuestion,
    public choices: string[],
    public id: number | null = null,
    public type: Type = Type.MULTI_CHOICE
  ) {}
}
