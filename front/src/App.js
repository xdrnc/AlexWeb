import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    console.log("ctor called");
      super(props);
      this.reload = this.reload.bind(this);

      this.state = {
          isLoaded: false,
          pi: 0,
          sunCircumference: 0,
      }
  }

  componentDidMount(){
      console.log("compoennt did mount called");
  }
  
  fetchData()
  {
      console.log("fetchData called");
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

  reload(){
    console.log("reload is called");
    this.fetchData();
    // this.setState({
    //     isLoaded : false
    // })
  }

  render(){
    var {isLoaded, pi, sunCircumference} = this.state;

    // if(!isLoaded)
    // {
    //   this.fetchData();
    //   return(
    //       <>
    //           <p>data is loading</p>
    //       </>
    //   );
    // }
    // else 
    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={this.reload}>calculate</button>
        
        <p>
          pi: {pi}
          <br/>
          sun Circumference: {sunCircumference}
        </p>
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
