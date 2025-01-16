import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(`http://localhost/get_tweets.php?page=${page}&limit=5`);
        setTweets(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTweets();
  }, [page]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <strong>{tweet.username}:</strong> {tweet.content}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default Dashboard;
