import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
    const { id } = useParams();  // Get tweet ID from the URL
    const [tweet, setTweet] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTweet = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-tweet.php?id=${id}`);
                setTweet(response.data);
            } catch (error) {
                setError("Error fetching tweet. Please try again later.");
            }
        };

        fetchTweet();
    }, [id]);

    return (
        <div className="container my-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {tweet ? (
                <>
                    <h1 className="mb-4">{tweet.content}</h1>
                    <p><strong>Author ID:</strong> {tweet.author_id}</p>
                    {/* Add any additional tweet information here */}
                </>
            ) : (
                <p>Loading tweet...</p>
            )}
        </div>
    );
};

export default Post;
