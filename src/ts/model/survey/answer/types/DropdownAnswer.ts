import Answer from '../Answer';
import { Type } from '../../question/Question';
import DropdownQuestion from '../../question/types/DropdownQuestion';

export default class DropdownAnswer implements Answer {
  constructor(
    public question: DropdownQuestion,
    public dropdownChoice: string,
    public id: number | null = null,
    public type: Type = Type.DROPDOWN
  ) {}
}
