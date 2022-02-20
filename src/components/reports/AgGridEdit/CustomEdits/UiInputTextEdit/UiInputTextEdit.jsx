import React, { Component, createRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding-left: 7px;
  user-select: all;
`;

class UiInputTextEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.inputRef = createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  getValue() {
    // this simple editor doubles any value entered into the input
    return this.state.value;
  }

  // Gets called once before editing starts, to give editor a chance to
  // cancel the editing before it even starts.
  isCancelBeforeStart() {
    return false;
  }

  // Gets called once when editing is finished (eg if Enter is pressed).
  // If you return true, then the result of the edit will be ignored.
  isCancelAfterEnd() {
    // our editor will reject any value greater than 1000
    return false;
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.stopEditing();
    }
  };

  handleChange = (event) => {
    this.setState((prev) => {
      return { value: event.target.value };
    });
  };

  render() {
    return (
      <StyledInput
        type="text"
        className="my-editor"
        ref={this.inputRef}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default UiInputTextEdit;
