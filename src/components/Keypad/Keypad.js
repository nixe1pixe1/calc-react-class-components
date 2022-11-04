import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ACTIONS } from "../../constants/actions";
import { desktopButtons, mobileButtons } from "../../utils/buttons";

const mapStateToProps = (state) => ({ keypad: state.keypad });
const mapDispatchToProps = (dispatch) => ({
  display: (res) => dispatch({ type: ACTIONS.DISPLAY, payload: res }),
  someAction: (res) => dispatch({ type: ACTIONS[res.action] }),
});

class Keypad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }

  updateWidth() {
    this.setState({
      width: window.innerWidth,
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  handleClick(button) {
    const res = this.props.keypad.executeAction(button.action);

    if (typeof res === "string") return this.props.display(res);

    return this.props.someAction(res);
  }

  render() {
    return (
      <StyledKeypad>
        {this.state.width <= 840 ? (
          <>
            {mobileButtons.map((button) => (
              <Button key={button.id} onClick={() => this.handleClick(button)}>
                {button.text}
              </Button>
            ))}
          </>
        ) : (
          <>
            {desktopButtons.map((button) => (
              <Button key={button.id} onClick={() => this.handleClick(button)}>
                {button.text}
              </Button>
            ))}
          </>
        )}
      </StyledKeypad>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keypad);

const StyledKeypad = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  column-gap: 2px;
  margin: 20px;

  @media screen and (max-width: 840px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Button = styled.button`
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  min-width: 60px;
  border-radius: 50%;
  border: none;
  font-size: 36px;
  transition: height 0.5s, width 0.5s, background-color 0.5s, font-size 0.5s,
    border-radius 0.5s, color 0.5s;
  background-color: var(--button-bg);
  color: var(--button-fg);
  cursor: pointer;

  &:active {
    border-radius: 20px;
    background-color: var(--button-bg-active);
  }

  @media screen and (max-width: 405px) {
    height: 60px;
    width: 60px;
    font-size: 24px;
  }
`;
