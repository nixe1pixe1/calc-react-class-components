import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const mapStateToProps = (state) => ({ value: state.display });

class Display extends Component {
  constructor(props) {
    super(props);
    this.elRef = createRef(null);
  }

  componentDidUpdate() {
    this.elRef.current.scrollLeft = this.elRef.current.scrollWidth;
  }

  render() {
    return (
      <StyledDisplay ref={this.elRef}>{this.props.value}</StyledDisplay> 
    );
  }
}

export default connect(mapStateToProps)(Display);

const StyledDisplay = styled.div`
  margin: 0 20px 20px 20px;
  padding: 20px;
  line-height: 36px;
  min-height: 100px;
  font-size: 36px;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-weight: bold;
  background-color: var(--bg-secondary);
  border-radius: 0 0 20px 20px;
  color: var(--result-fg);
  transition: background-color 0.5s, color 0.5s;
`;
