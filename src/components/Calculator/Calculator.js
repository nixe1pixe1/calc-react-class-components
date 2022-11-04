import React, { Component } from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import Display from "../Display/Display";
import History from "../History/History";
import Keypad from "../Keypad/Keypad";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

export class Calculator extends Component {
  render() {
    return (
      <>
        <StyledCalculator>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage>
                  <Primary>
                    <Display />
                    <Keypad />
                  </Primary>
                  <Secondary>
                    <History />
                  </Secondary>
                </HomePage>
              }
            />
            <Route path="/settings" element={<ControlPanel />} />
          </Routes>
        </StyledCalculator>
      </>
    );
  }
};

const StyledCalculator = styled.div`
  display: flex;
`;

const HomePage = styled.div`
  display: flex;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 20px;

  @media screen and (max-width: 626px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 460px) {
    padding: 0;
  }
`;

const Primary = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media screen and (max-width: 626px) {
    width: 100%
  }
`;

const Secondary = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  border-left: 1px solid #707070;
  min-width: 240px;

  @media screen and (max-width: 626px) {
    display: none;
  }
`;
