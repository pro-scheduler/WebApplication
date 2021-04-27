import Answer from '../Answer';
import YesOrNoQuestion from '../../question/types/YesOrNoQuestion';
import { Type } from '../../question/Question';

export default class YesOrNoAnswer implements Answer {
  constructor(
    public id: number,
    public question: YesOrNoQuestion,
    public decision: boolean,
    public type: Type = Type.YES_OR_NO
  ) {}
}
