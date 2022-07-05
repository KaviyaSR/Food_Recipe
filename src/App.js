import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Receipes from './components/Receipes';
import store from './redux/store';
function App() {
  return (
    <div>
    <Provider store={store}>
    <Router>
       <Switch> 
          <Route  exact path="/" component={HomePage }/>
          <Route  path="/receipes" component={Receipes }/>
         </Switch>
  </Router>
  </Provider>
  </div>
    
  );
}

export default App;
