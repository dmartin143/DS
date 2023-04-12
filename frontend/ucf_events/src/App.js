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
import EventAdminBox from './Components/Event-Description-Admin/EventAdminBox';
import EventStudentBox from './Components/Event-Description-Student/EventStudentBox';
import JoinRSOBox from './Components/Join-RSO/JoinRSOBox';
import FormGroupBox from './Components/Form-Group/FormGroupBox';
// import ProfileBox from './Components/Profile/ProfileBox';
import CreateRSOBox from './Components/Create-RSO/CreateRSOBox';
import HostEventBox from './Components/Host-Event/HostEventBox';
import SuperAdminToolsBox from './Components/Super-Admin-Tools/SuperAdminToolsBox';
// import UniversityAdminBox from './Components/University-Admin/UniversityAdminBox';
import UniversityInfoBox from './Components/University-Info/UniversityInfoBox';
import CreateUniversityBox from './Components/Create-University/CreateUniversityBox';
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
            <Route exact path='/event-info-admin' element={<EventAdminBox />} />
            <Route exact path='/event-info-student' element={<EventStudentBox />} />
            <Route exact path='/join-rso' element={<JoinRSOBox />} />
            <Route exact path='/form-group' element={<FormGroupBox />} />
            {/* <Route exact path='/profile' element={<ProfileBox />} /> */}
            <Route exact path='/create-RSO' element={<CreateRSOBox />} />
            <Route exact path='/host-event' element={<HostEventBox />} />
            <Route exact path='/super-admin' element={<SuperAdminToolsBox />} />
            <Route exact path='/university-info' element={<UniversityInfoBox />} />
            {/* <Route exact path='/university-info-admin' element={<UniversityAdminBox />} /> */}
            <Route exact path='/create-uni' element={<CreateUniversityBox />} />

          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
