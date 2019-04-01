import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import LeavePage from './components/LeavePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
     // leaves:[]
    }
  }

  // componentDidMount() {
  //   this.getLeaves();
  // }

  // getLeaves = _ => {
  //   fetch('http://localhost:3000/leaves')
  //     .then(response => response.json())
  //     // .then(({data})=>{
  //     //   console.log(data);
  //     // })
  //     .then(response => this.setState({ leaves: response.data}))
  //     .catch(err=>console.error(err));
  // }

  // renderLeave = ({ leave_type_code, leave_type}) => <div id={leave_type_code}><h1>{leave_type}</h1></div>

  render() {
    //const { leaves } = this.state;
    return (
      <Router>
      <div className="App">
        <AppNavbar />
        <Route path="/LeavePage" component={LeavePage} />
        {/*{leaves.map(this.renderLeave)}*/}
      </div>
      </Router>
    );
  }
}

export default App;
