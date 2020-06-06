import React from 'react';
import HomePage from './components/pages/home-page/HomePage';
import 'tachyons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FeedPage from './components/pages/feed-page/FeedPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route to="/manage">
          <FeedPage/>
        </Route>
        <Route to="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
