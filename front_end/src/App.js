import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from './components/Header';
import Home from './components/homePage/Home';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import useAuthentication from './useAuthentication';
import React, { useContext } from 'react';
import CreateOrganization from './components/createOrganization/CreateOrganization';
import AppStart from './components/AppStart';
import ProtectedComponent from './components/ProtectedComponent';

const { Content } = Layout

function App() {
  const {AuthCtx} = useAuthentication();
  const {user} = useContext(AuthCtx);
  return (
    <Router>  
      <div className="App">
        <Layout>
          <AppHeader user={user}/>
          <Layout style={{minHeight: '90vh'}}>
            <Content>
              <Switch>
                  <Route exact path="/"><Home/></Route>
                  <Route path="/login"><Login/></Route>
                  <Route path="/signup"><SignUp/></Route>
                  <ProtectedComponent user={user} exact path="/app"><AppStart/></ProtectedComponent>
                  <ProtectedComponent user={user} path="/app/createorg"><CreateOrganization/></ProtectedComponent>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
