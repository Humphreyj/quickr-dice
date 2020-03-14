import React from 'react';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Player from './components/main/Player';
import Splash from './components/home/Splash';
import Login from './components/home/Login';
import Register from './components/home/Register';


import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Route path = '/' exact component={Splash}/>
      <Route path='/login' component={Login} />
      <Route path ='/register' component={Register} />
      <Route path = '/player' component ={Player} />
      <Footer />
    </div>
  );
}

export default App;
