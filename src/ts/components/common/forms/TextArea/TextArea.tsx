import React from 'react';
import styles from './TextArea.module.css';

type TextAreaProps = { label: string };
type TextAreaState = { value: string };

class TextArea extends React.Component<TextAreaProps, TextAreaState> {
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
        <div className={styles.label_classic}>{this.props.label}</div>
        <textarea
          className={styles.text_area_classic}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TextArea;
