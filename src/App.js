import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import DailyCases from 'pages/DailyCases';
import TotalCases from 'pages/TotalCases';

import routes from 'pages/routes';

import './App.scss';

function App() {
    return (
        <Router>
            <Switch>
                <Route path={routes.daily} exact component={DailyCases} />
                <Route path={routes.total} exact component={TotalCases} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
