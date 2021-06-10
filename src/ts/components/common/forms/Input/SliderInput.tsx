import React, { ChangeEvent } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { Form } from 'react-bootstrap';

export type SliderProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>, value: number) => void;
};

const SliderInput = ({ value, min = 0, max = 10, onChange }: SliderProps) => {
  return (
    <Form>
      <Form.Group>
        <RangeSlider
          value={value}
          variant={'secondary'}
          onChange={onChange}
          min={min}
          max={max}
          tooltip={'auto'}
        />
      </Form.Group>
    </Form>
  );
};

export default SliderInput;
