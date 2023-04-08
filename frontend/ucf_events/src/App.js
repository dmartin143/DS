import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomeBox from './Components/Home/HomeBox';
import LoginBox from './Components/Login/LoginBox';
import RegisterBox from './Components/Register/RegisterBox';
import AdminBox from './Components/Admin-Home/AdminBox';
import StudentBox from './Components/Student-Home/StudentBox';
import EventBox from './Components/Event-Description/EventBox';
import JoinRSOBox from './Components/Join-RSO/JoinRSOBox';
import FormGroupBox from './Components/Form-Group/FormGroupBox';
import ProfileBox from './Components/Profile/ProfileBox';
import CreateRSOBox from './Components/Create-RSO/CreateRSOBox';
import HostEventBox from './Components/Host-Event/HostEventBox';
import SuperAdminToolsBox from './Components/Super-Admin-Tools/SuperAdminToolsBox';
import UniversityBox from './Components/University/UniversityBox';

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
          <Routes>
            <Route exact path='' element={<LoginBox goToHome={this.goToHome}/>} />
            <Route exact path='/Register' element={<RegisterBox />} />
            <Route exact path='/Admin' element={<AdminBox />} />
            <Route exact path='/Student' element={<StudentBox />} />
            <Route exact path='/event-info' element={<EventBox />} />
            <Route exact path='/join-rso' element={<JoinRSOBox />} />
            <Route exact path='/form-group' element={<FormGroupBox />} />
            <Route exact path='/profile' element={<ProfileBox />} />
            <Route exact path='/create-RSO' element={<CreateRSOBox />} />
            <Route exact path='/host-event' element={<HostEventBox />} />
            <Route exact path='/super-admin' element={<SuperAdminToolsBox />} />
            <Route exact path='/university-info' element={<UniversityBox />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
