import './App.css';
import { BrowseProd } from './components/browseProd/browseProd';
import { AddProduct } from './components/addProduct/addProduct';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import ProtectedRoute from './components/auth/protected/Protected';
import NotProtectedRoute from './components/auth/not_protected/NotProtected';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/new-product"
            element={<ProtectedRoute component={AddProduct} />}
          />
          <Route
            path="/login"
            element={<NotProtectedRoute component={Login} />}
          />
          <Route
            path="/register"
            element={<NotProtectedRoute component={Register} />}
          />
          <Route path="/" element={<BrowseProd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
