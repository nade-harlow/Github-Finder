
import React, {Component} from 'react';
import './App.css';

class App extends Component{
  render(){
    const name= "Jon"
    const loading= false;
    const showName= false;
    return (
    <div className="App">
     {loading ? <h4>Loading...</h4> : showName ? <h1>Hello {name}</h1> : null}
    </div>
  );
  }  
}

export default App;
