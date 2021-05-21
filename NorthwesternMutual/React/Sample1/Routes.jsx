import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Applicant from './Components/Applicant';
import Dashboard from './Components/Dashboard/Dashboard';
import Database from './Components/Database';
import FormEdit from './Components/Form/FormEdit';
import FormPreview from './Components/Form/FormPreview';
import EmailEdit from './Components/Email/EmailEdit';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import Pipelines from './Components/Pipeline/Pipelines';
import PipelineEdit from './Components/Pipeline/PipelineEdit';
import Modules from './Components/Modules/Modules';
import Navbar from './Components/Navbar';

const Routes = ({ redirectTo }) => {
  return (
    <Router className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (redirectTo === 'dashboard') {
              return <Redirect to={{ pathname: '/dashboard' }} />;
            }
            if (redirectTo === 'login') {
              return <Redirect to={{ pathname: '/login' }} />;
            }
            return '';
          }}
        />
        <Route path="/applicant/:id">
          <Navbar />
          <Applicant />
        </Route>
        <Route path="/database">
          <Navbar />
          <Database />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/pipelines">
          <Navbar />
          <Pipelines />
        </Route>
        <Route path="/pipelines/:pid">
          <Navbar />
          <PipelineEdit />
        </Route>
        <Route path="/modules">
          <Navbar />
          <Modules />
        </Route>
        <Route path="/forms/:fid" exact>
          <Navbar />
          <FormEdit />
        </Route>
        <Route path="/forms/:fid/preview">
          <Navbar />
          <FormPreview />
        </Route>
        <Route path="/emails/:eid">
          <Navbar />
          <EmailEdit />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
