import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TweetList() {

    const [tweets, setTweets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTweets, setTotalTweets] = useState(0);
    const tweetsPerPage = 10;

    useEffect(() => {
        const fetchTweets = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tweets.php?page=${currentPage}`);
                setTweets(response.data.tweets);
                setTotalTweets(response.data.totalTweets);
                setIsLoading(false);
            }
            catch(error) {
                console.error(error);
                setError('Failed to load tweets.');
                setIsLoading(false);
            }

        };

        fetchTweets();
    }, [currentPage]);

    const totalPages = Math.ceil(totalTweets / tweetsPerPage);
    const goToPreviousPage = () => setCurrentPage(currentPage - 1);
    const goToNextPage = () => setCurrentPage(currentPage + 1);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Tweets</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {isLoading ? (
                    <p>Loading tweets...</p>
                ) : tweets.length ? (
                    tweets.map(tweet => (
                        <div className="col-md-6" key={tweet.id}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p className="card-text">{tweet.content}</p>
                                    <p className="card-text"><strong>By:</strong> {tweet.author_id} on { new Date(tweet.created_at).toLocaleDateString()}</p>
                                    <Link to={`/tweet/${tweet.id}`} className="btn btn-primary">Read More</Link>
                                </div>
                            </div>    
                        </div>    
                    ))
                ) : (
                    <p>No tweets available.</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={goToPreviousPage}
                >
                    Previous
                </button>
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    onClick={goToNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default TweetList;
