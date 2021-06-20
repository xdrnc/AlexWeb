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
          sunCircumferenceKM: 0,
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
              sunCircumferenceKM: json.sunCircumferenceKM,
          })
      });

  }

  reload(){
    console.log("reload is called");
    this.fetchData();
  }

  render(){
    var {pi, sunCircumferenceKM} = this.state;

    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={this.reload}>calculate</button>
        
        <p>
          pi: {pi}
          <br/>
          sun Circumference: {sunCircumferenceKM} in KM.
        </p>
      </header>
    </div>
    );
  }
}

export default App;
