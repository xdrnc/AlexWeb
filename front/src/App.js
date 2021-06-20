import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);

      this.state = {
          isLoaded: false,
          pi: 0,
          sunCircumference: 0,
      }
  }

  componentDidMount(){
      console.log("compoennt did mount called");

      fetch('http://localhost:2999/calculate')
      .then(res => res.json())
      .then(json => {
          this.setState({
              isLoaded: true,
              pi: json.pi,
              sunCircumference: json.sunCircumference,
          })
      });
  }
  
  render(){
    var {isLoaded, pi, sunCircumference} = this.state;

    if(!isLoaded)
    {
        return(
            <>
                <p>data is loading</p>
            </>
        );
    }
    else return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <br/>
          pi: {pi}
          <br/>
          sun sunCircumference: {sunCircumference}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React alextest
        </a>
      </header>
    </div>
    );
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
