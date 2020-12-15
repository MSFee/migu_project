import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import IndexHome from './components/home';
import Header from './components/header';
import PlayList from './components/playlist';
import Singer from './components/singer';
function App() {
  return (
    <Router>
      <Route path="/" component={Header}>
      </Route>
      <Route path="/home" component={IndexHome}></Route>
      <Route path="/playlist" component={PlayList}></Route>
      <Route path="/singer" component={Singer}></Route>
    </Router>
  );
}

export default App;
