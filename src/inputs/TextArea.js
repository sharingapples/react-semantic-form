import React from 'react';
import ValidationError from '../ValidationError';

class TextArea extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.value || undefined
    }
  }

  getValue() {
    return Promise.resolve(this.state.value);
  }

  validate(value) {
    const { name,
      required, requiredMsg,
      minLength, minLengthMsg,
      maxLength, maxLengthMsg,
      regex, regexMsg } = this.props;

    // Normalize value
    if (value === "" || value === undefined || value === null) {
      value = null;
      if (required) {
        return Promise.reject(new ValidationError(this, name, requiredMsg || "Value is required"));
      } else {
        return Promise.resolve(null);
      }
    }

    if (minLength && value.length < minLength) {
      return Promise.reject(new ValidationError(this, name, minLengthMsg || ("Value must be at least " + minLength + " characters")));
    }

    if (maxLength && value.length > maxLength) {
      return Promise.reject(new ValidationError(this, name, maxLengthMsg || ("Value cannot be more than " + maxLength + " characters")));
    }

    if (regex && !regex.test(value)) {
      return Promise.reject(new ValidationError(this, name, regexMsg || ("Value must be of the given format")));
    }

    return Promise.resolve(value);
  }

  _onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  _onKeyDown(e) {
    e.stopPropagation();
  }

  render() {
    const { className, ...other } = this.props;

    return (
      <textarea rows={4} {...other} onChange={this._onChange.bind(this)} onKeyDown={this._onKeyDown.bind(this)}/>
    );
  }
}

export default TextArea;
