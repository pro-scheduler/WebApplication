import Answer from '../Answer';
import OpenQuestion from '../../question/types/OpenQuestion';
import { Type } from '../../question/Question';

export default class OpenAnswer implements Answer {
  constructor(
    public id: number,
    public question: OpenQuestion,
    public text: string,
    public type: Type = Type.OPEN
  ) {}
}