import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
    const { id } = useParams(); // Get post ID from the URL
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/post.php?id=${id}`);
                const post = response.data.data; // Assuming the API returns a `data` object with post details
                setPost(post);
            } catch (err) {
                console.error(err);
                setError("Error fetching the post. Please try again later.");
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div className="container my-4 alert alert-danger">{error}</div>;
    }

    if (!post) {
        return <div className="container my-4">Loading...</div>;
    }

    return (
        <div className="container my-4">
            <h1 className="mb-4">{post.title}</h1>
            <p>{post.content}</p>
            <hr />
            <div className="d-flex justify-content-between">
                <div>
                    <small className="text-muted">
                        Posted by {post.author} on {post.date}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Post;
