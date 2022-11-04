import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ACTIONS } from "../../constants/actions";
import { Container } from "../Container/Container";

const mapStateToProps = (state) => ({ theme: state.theme });

const mapDispatchToProps = (dispatch) => ({
  dark: () => dispatch({ type: ACTIONS.THEME, payload: "Dark" }),
  light: () => dispatch({ type: ACTIONS.THEME, payload: "Light" }),
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.props.theme === "Light"
      ? this.props.dark()
      : this.props.light()
  }

  render() {
    return (
      <StyledHeader>
        <Container>
          <Wrapper>
            <Link className={"title"} to={"/"} end>
              Calculator
            </Link>
            <RightSide>
              <Button onClick={this.toggleTheme}>{this.props.theme}</Button>
              <Links>
                <Link to={"/"} end>
                  Home
                </Link>
                <Link to={"/settings"} end>
                  Settings
                </Link>
              </Links>
            </RightSide>
          </Wrapper>
        </Container>
      </StyledHeader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const Button = styled.div`
  width: 80px;
  background-color: var(--button-bg);
  border-radius: 20px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: var(--button-fg);
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: var(--button-bg-active);
  }
`;

const StyledHeader = styled.div`
  background-color: #434343;
  height: 11vh;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Link = styled(NavLink)`
  color: white;
  text-decoration: none;

  &.active:not(.title) {
    text-decoration: underline;
  }

  &.title {
    font-size: 24px;
  }
`;
