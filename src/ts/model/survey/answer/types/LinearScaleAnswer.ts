import Answer from '../Answer';
import LinearScaleQuestion from '../../question/types/LinearScaleQuestion';
import { Type } from '../../question/Question';

export default class LinearScaleAnswer implements Answer {
  constructor(
    public question: LinearScaleQuestion,
    public rating: number,
    public id: number | null = null,
    public type: Type = Type.LINEAR_SCALE
  ) {}
}
