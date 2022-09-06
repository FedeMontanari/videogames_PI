import { useRef } from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import GameDetail from './components/GameDetails/GameDetail';
import CreateGame from './components/CreateGame/CreateGame';

function App() {

  const homeRef = useRef(null)

  return (
    <div className="App">
      <Route exact path='/' component={Landing} /> 
      <Route exact path='/home' ><Home homeRef={homeRef}/></Route>
      <Route exact path='/videogames/create' component={CreateGame} />
      <Route exact path='/videogame/:gameId' component={GameDetail} />
    </div>
  );
}

export default App;
