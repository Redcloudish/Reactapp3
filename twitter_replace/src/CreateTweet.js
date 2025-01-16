import React, { useState } from 'react';
import axios from 'axios';

function CreateTweet() {
  const [content, setContent] = useState('');

  const handleCreateTweet = async () => {
    try {
      const userId = 1; // Simulating logged-in user ID for now
      const response = await axios.post('http://localhost/create_tweet.php', { user_id: userId, content });
      if (response.data.success) {
        alert('Tweet created');
      } else {
        alert('Failed to create tweet');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Create Tweet</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" />
      <button onClick={handleCreateTweet}>Post Tweet</button>
    </div>
  );
}

export default CreateTweet;
