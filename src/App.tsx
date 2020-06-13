import React from 'react';
import HomePage from './components/pages/home-page/HomePage';
import 'tachyons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FeedPage from './components/pages/feed-page/FeedPage';
import { FeedProvider } from './state/feedContext';

function App() {
  return (
    <FeedProvider>
      <Router>
        <Switch>
          <Route path="/manage">
            <FeedPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </FeedProvider>
  );
}


export default App;
