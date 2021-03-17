import React from 'react';
import styles from './RestButton.module.scss';

export default class RestButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.handleClick && this.props.handleClick(e.target.value)
  }

  render() {
    const currentClass = this.props.mode === 'transparent'
      ? styles.restButtonTransparentRoot
      : styles.restButtonRoot
    const className = `${currentClass} ${this.props.className}`
    return (
      <button
        className={className}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    );
  }
}