import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { HomeBox } from './Components/Home/HomeBox';
import { LoginBox } from './Components/Login/LoginBox';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priveledgeLevel: null,
    }

    this.goToHome = this.goToHome.bind(this);
  }

  goToHome(priveledgeLevel, authenticationToken) {
    this.setState({priveledgeLevel: priveledgeLevel});
    window.sessionStorage.setItem('priveledgeLevel', priveledgeLevel);
    window.sessionStorage.setItem('authenticationToken', authenticationToken);
    window.location.href = ('/UCFEvents/home');
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/UCFEvents'>
              <LoginBox goToHome={this.goToHome}/>
            </Route>
            <Route exact path='/UCFEvents/home'>
              <HomeBox priveledgeLevel={this.state.priveledgeLevel}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
