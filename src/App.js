import React from 'react';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Player from './components/main/Player';
import Splash from './components/home/Splash';
import Login from './components/home/Login';
import Register from './components/home/Register';


import { Route, Redirect } from 'react-router-dom';

function App() {

  const PrivateRoute = ({ component: Player, ...rest }) => (
    <Route 
    {...rest}
    render = {props => 
    localStorage.getItem('token') ? (
      <Player {...props} />
    ) : (
      <Redirect to='/login' />
    )
    }
    />
  )
  return (
    <div className="App">
      <Header />
      <Route path = '/' exact component={Splash}/>
      <Route path='/login' component={Login} />
      <Route path ='/register' component={Register} />
      <PrivateRoute path = '/player/:id' component ={Player} />
      <Footer />
    </div>
  );
}

export default App;
