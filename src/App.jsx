import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<News key="General" pageSize={5} country="us" category="general" />}
          />
          <Route
            path="/business"
            element={<News key="Business" pageSize={5} country="us" category="business" />}
          />
          <Route
            path="/entertainment"
            element={<News key="Entertainment" pageSize={5} country="us" category="entertainment" />}
          />
          <Route
            path="/general"
            element={<News key="General2" pageSize={5} country="us" category="general" />}
          />
          <Route
            path="/health"
            element={<News key="Health" pageSize={5} country="us" category="health" />}
          />
          <Route
            path="/science"
            element={<News key="Science" pageSize={5} country="us" category="science" />}
          />
          <Route
            path="/sports"
            element={<News key="Sports" pageSize={5} country="us" category="sports" />}
          />
          <Route
            path="/technology"
            element={<News key="Technology" pageSize={5} country="us" category="technology" />}
          />
        </Routes>
      </Router>
    );
  }
}
