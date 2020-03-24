import React, { Component } from "react";

import { CardList } from "./components/card-list";
import { SearchBox } from "./components/search-box";

import "./App.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchField: ""
    };
  }

  onSearchChanged = event => {
    this.setState({ searchField: event.target.value });
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/?format=json")
      .then(response => response.json())
      .then(data => this.setState({ robots: data }));
  }

  render() {
    const { robots, searchField } = this.state;

    const filteredRobots = robots.filter(el =>
      el.name.toLowerCase().includes(searchField)
    );

    return (
      <div className="App">
        <h1>Хайлтын систем</h1>
        <SearchBox onSearch={this.onSearchChanged} />
        <CardList robots={filteredRobots} />
      </div>
    );
  }
}
