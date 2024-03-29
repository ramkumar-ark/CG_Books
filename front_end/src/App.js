import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppHeader from './components/Header';
import Home from './components/homePage/Home';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import useAuthentication from './useAuthentication';
import React, { useContext } from 'react';
import AppStart from './components/AppStart';
import ProtectedComponent from './components/ProtectedComponent';
import ResetPassword from './components/ResetPassword';

const { Content } = Layout

function App() {
  const {AuthCtx} = useAuthentication();
  const {user} = useContext(AuthCtx);
  return (
    <Router>  
      <div className="App">
        <Layout style={{height:'100vh'}}>
          <AppHeader user={user}/>
            <Content>
              <Switch>
                  <Route exact path="/"><Home/></Route>
                  <Route path="/login"><Login/></Route>
                  <Route path="/signup"><SignUp/></Route>
                  <Route path="/resetpassword"><ResetPassword/></Route>
                  <ProtectedComponent user={user} path="/app"><AppStart/></ProtectedComponent>
                  <Route>
                    <>
                    <h1>404 Requested Resource Not Found.</h1>
                    <Link to={'/'}>Go to Home Page.</Link>
                    </>
                  </Route>
              </Switch>
            </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
