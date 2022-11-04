import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ACTIONS } from "../../constants/actions";

const mapStateToProps = (state) => ({ history: state.history });

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch({ type: ACTIONS.UNDO }),
  display: (val) => dispatch({ type: ACTIONS.DISPLAY, payload: val }),
});

class History extends Component {
  constructor(props) {
    super(props);

    this.handleUndo = this.handleUndo.bind(this);
    this.handleKeyClick = this.handleKeyClick.bind(this);
  }

  handleUndo() {
    this.props.undo();
  }

  handleKeyClick(val) {
    this.props.display(val);
  }

  render() {
    return (
      <StyledHistory>
        <HistoryHeader>
          <Back onClick={this.handleUndo}>⇐</Back>
          <Title>History</Title>
          <Space></Space>
        </HistoryHeader>
        <div>
          {this.props.history.map((el, i) => (
            <HistoryEl key={Date.now() + i}>
              <HistoryKey onClick={() => this.handleKeyClick(el.expression)}>
                {el.expression}
              </HistoryKey>
              <span>&nbsp;=&nbsp;</span>
              <HistoryKey onClick={() => this.handleKeyClick(el.value)}>
                {el.value}
              </HistoryKey>
            </HistoryEl>
          ))}
        </div>
      </StyledHistory>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);

const StyledHistory = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 570px;
  overflow-y: auto;
`;

const Space = styled.div`
  width: 50px;
`;

const Back = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  outline: none;
  border: none;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  background-color: var(--button-bg);
  color: var(--button-fg);
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: var(--button-bg-active);
  }
`;

const HistoryKey = styled.div`
  background-color: var(--button-bg);
  color: white;
  padding: 2px 6px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: var(--button-bg-active);
  }
`;

const HistoryHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  text-align: center;
  line-height: 48px;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: var(--bg-secondary);
  transition: background-color 0.5s, color 0.5s;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--result-fg);
  transition: color 0.5s;
`;

const HistoryEl = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #707070;
  color: var(--button-fg);
  overflow-wrap: anywhere;
  transition: color 0.5s;

  & * {
    transition: background-color 0.5s, color 0.5s;
    color: var(--button-fg);
  }
`;
