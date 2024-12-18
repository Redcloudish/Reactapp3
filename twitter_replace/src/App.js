import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // npm install react-router-dom
import './App.css';
import Navbar from './components/Navbar';
import CreateTweet from './components/CreateTweet'; // Renamed from CreatePost
import Tweet from './components/Tweet'; // Renamed from Post
import TweetList from './components/TweetList'; // Renamed from PostList
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<TweetList />} /> {/* Renamed from PostList */}
          <Route path={"/create-tweet"} element={<CreateTweet />} /> {/* Renamed from CreatePost */}
          <Route path={"/tweet/:id"} element={<Tweet />} /> {/* Renamed from Post */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
