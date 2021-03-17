import React from 'react';
import './RestTextArea.scss';

export default class RestTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (e) {
    this.props.handleInput && this.props.handleInput(e.target.value)
  }

  render() {
    const value = this.props.value
    const placeholder = this.props.placeholder
    const className = `rest-text-area-root ${this.props.className}`
    return (
      <div className={className}>
        <textarea
          className='rest-text-area'
          value={value}
          placeholder={placeholder}
          onChange={this.handleInput}
        />
        <div className='rest-text-area-right'>
          {this.props.children}
        </div>
      </div>
    );
  }
}