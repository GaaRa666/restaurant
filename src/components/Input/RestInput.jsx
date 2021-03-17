import React from 'react';
import './RestInput.scss';

export default class RestInput extends React.Component {
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
    const className = `rest-input-root ${this.props.className}`
    return (
      <div className={className}>
        <input
          className='rest-input'
          value={value}
          placeholder={placeholder}
          onChange={this.handleInput}
        />
        <div className='rest-input-right'>
          {this.props.children}
        </div>
      </div>
    );
  }
}