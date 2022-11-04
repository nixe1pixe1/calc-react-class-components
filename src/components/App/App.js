import React, { Component } from "react";
import { Calculator } from "../Calculator/Calculator";
import Header from "../Header/Header";

export class App extends Component {
  render() {
    return (
       <>
        <Header />
        <Calculator />
       </>
    );
  }
}