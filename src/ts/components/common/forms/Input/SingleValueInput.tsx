import React from 'react';
import styles from './SingleValueInput.module.css';

type SingleValueInputState = { value: string };
type SingleValueInputProps = {};
class SingleValueInput extends React.Component<SingleValueInputProps, SingleValueInputState> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <div className={styles.label_classic}>Name</div>
        <input
          className={styles.input_classic}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SingleValueInput;
