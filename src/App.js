import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios'
import './App.css';
import Alert from './components/layout/Alert';

class App extends Component{
  state= {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
  //   this.setState({loading: true});
  //   const res= await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID
  //   }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   console.log(res.data)
  //   this.setState({users: res.data, loading: false})
  // }
  searchUsers= async text =>{
    this.setState({loading: true})
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users: res.data.items, loading: false})
  }

  clearUsers= () => this.setState({users:[], loading:false})

  setAlert= (msg, type) => {
    this.setState({alert:{msg, type}})

    setTimeout(() => this.setState({alert: null}), 5000)
  }
  render(){
    const {users, loading}= this.state
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className= "container">
            <Alert alert={this.state.alert }/>
            <Switch>
              <Route exact path="/ " element={
                <Search  
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ?true:false}
                  setAlert={this.setAlert}
                />
              }/>
            </Switch>
            
            
            <Users loading={loading} users={users}/>
          </div>
        </div>
      </Router>
  );
  }  
}

export default App;
