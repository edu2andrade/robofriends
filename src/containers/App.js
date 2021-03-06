import React, { useState, useEffect } from "react"; // using hooks!
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "../containers/App.css";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

// After using Hooks we don't need a class component anymore
function App() {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  // Use setState instead of constructor:
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  // componentDidMount() {
  // fetch('https://jsonplaceholder.typicode.com/users')
  // .then(response=> response.json())
  // .then(users=> {this.setState({ robots: users })});
  // }

  // useEffect:
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setRobots(users);
      });
  });

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  return !robots.lenght === 0 ? (
    <h1>Loading</h1>
  ) : (
    <div className="tc">
      <h1>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;
