// src/components/Tweet.js

import React from 'react';

const Tweet = ({ tweet }) => {
  return (
    <div className="tweet">
      <h5>{tweet.username}</h5>
      <p>{tweet.content}</p>
      <small>{new Date(tweet.timestamp).toLocaleString()}</small>
    </div>
  );
};

export default Tweet;
