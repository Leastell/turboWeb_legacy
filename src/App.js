import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import datePlaylist from './components/datePlaylist'
import userDisplay from './components/userDisplay'
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
        <Route exact path="/music" component={MusicPage}/>
        <Route path="/music/user/:userID" component={userDisplay}/>
        <Route path="/music/:playlistDate" component={datePlaylist}/>
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/events" component={ConstructionPage}/>
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
