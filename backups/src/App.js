import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Playlist from './components/playlist'
import DiscordButton from './components/discordbutton'

// Pages
import badRoute from './pages/404';
import Navbar from './components/navbar';
import HomePage from './pages/homepage';
import MusicPage from './pages/musicpage';
import ConstructionPage from './pages/constructionpage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="appPad">
      <Switch>
        <Route exact path="/Music" component={MusicPage}/>
        <Route path="/Music/:playlistDate" component={Playlist}/>
        <Route exact path="/Home" component={HomePage}/>
        <Route exact path="/Servers" component={ConstructionPage}/>
        <Route exact path="/404" component={badRoute}/>
        <Redirect exact from="/" to='/Home'></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
      </div>
      <DiscordButton />
    </Router>
  );
}
export default App;
