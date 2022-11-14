import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './components/login';
import Landing from './components/landing';
import ForgotPassword from './components/forgotpassword';
import UserAdmin from './components/useradmin/useradmin';
import SiteAdmin from './components/siteadmin/siteadmin';
import Sidebar from './components/sidebar';
import PasswordReset from './components/passwordreset';

function App() {

  return (
    <div className="App">
      
      <Router>
      <Sidebar />
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/passwordreset" element={<PasswordReset/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/landing" element={<Landing/>}/>
          <Route exact path="/useradmin" element={<UserAdmin/>}/>
          <Route exact path="/siteadmin" element={<SiteAdmin/>}/>
          <Route path="*" element={<h1>404</h1>}/>
          <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
    </Router>

    </div>
  );
}

export default App;
