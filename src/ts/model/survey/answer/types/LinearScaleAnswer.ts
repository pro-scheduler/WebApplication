import Answer from '../Answer';
import LinearScaleQuestion from '../../question/types/LinearScaleQuestion';
import { Type } from '../../question/Question';

export default class LinearScaleAnswer implements Answer {
  constructor(
    public id: number,
    public question: LinearScaleQuestion,
    public rating: number,
    public type: Type = Type.LINEAR_SCALE
  ) {}
}
