import React from 'react';
import './App.css';

import routes from './routes/index';
import {
  BrowserRouter,
} from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      { routes }
    </BrowserRouter>
  );
}

export default App;
