import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ACTIONS } from "../../constants/actions";
import { Container } from "../Container/Container";

const mapStateToProps = (state) => ({ theme: state.theme });

const mapDispatchToProps = (dispatch) => ({
  clearWithHistory: () => dispatch({ type: ACTIONS.CLEAR_WITH_HISTORY }),
  toggleTheme: (value) => dispatch({ type: ACTIONS.THEME, payload: value }),
});

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.themes = [
      {
        id: 1,
        value: "Light",
      },
      {
        id: 2,
        value: "Dark",
      },
    ];

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleClick = () => this.props.clearWithHistory();
  handleSelect = (e) => {
    console.log(e.target.value);
    this.props.toggleTheme(e.target.value);
  };

  render() {
    return (
      <StyledControlPanel>
        <Container>
          <Title>Settings</Title>
          <Wrapper>
            <Select onChange={this.handleSelect} value={this.props.theme}>
              {this.themes.map((el) => (
                <option key={el.id}>{el.value}</option>
              ))}
            </Select>
            <Button onClick={this.handleClick}>Clear all history</Button>
          </Wrapper>
        </Container>
      </StyledControlPanel>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  gap: 32px;
`;

const StyledControlPanel = styled.div`
  display: flex;
  flex-grow: 2;
`;

const Title = styled.div`
  font-size: 36px;
  padding: 60px 0 45px 0;
  font-weight: bold;
  color: var(--result-fg);
  transition: color 0.5s;
`;

const Select = styled.select`
  width: 240px;
  padding: 12px;
  font-weight: bold;
  color: var(--button-fg);
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: var(--button-bg);
  transition: background-color 0.5s, color 0.5s;
`;

const Button = styled.button`
  padding: 12px;
  outline: none;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  background-color: var(--button-bg);
  color: var(--button-fg);
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: var(--button-bg-active);
  }
`;
